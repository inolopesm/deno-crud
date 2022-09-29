import { HttpController } from "./http-controller.ts";
import { HttpMethod } from "./http-method.ts";
import { HttpRequest } from "./http-request.ts";
import { HttpStatusCode } from "./http-status-code.ts";

type Pathname = `/${string}`
type RouteKey = `${HttpMethod} ${Pathname}`

export class HttpServer {
  private readonly routes = new Map<RouteKey, HttpController>();

  private addRoute(
    method: HttpMethod,
    pathname: Pathname,
    controller: HttpController
  ) {
    this.routes.set(`${method} ${pathname}`, controller);
  }

  private getHttpController(method: HttpMethod, pathname: Pathname) {
    return this.routes.get(`${method} ${pathname}`)
  }

  private async processHttpController(
    httpRequest: HttpRequest,
    httpController: HttpController | undefined
  ) {
    const headers = new Headers({ "content-type": "application/json" });

    if (!httpController) {
      return new Response(
        JSON.stringify({ message: "route not found" }),
        { headers, status: HttpStatusCode.NOT_FOUND },
      );
    }

    try {
      const { statusCode, body } = await httpController.handle(httpRequest);

      return new Response(
        body !== null ? JSON.stringify(body) : null,
        { headers, status: statusCode }
      );
    } catch (error) {
      if (error instanceof Error) {
        return new Response(
          JSON.stringify({ message: error.message }),
          { headers, status: HttpStatusCode.INTERNAL_SERVER_ERROR }
        );
      }

      throw error
    }
  }

  private async handleRequest(conn: Deno.Conn) {
    const httpConn = Deno.serveHttp(conn);

    for await (const { request, respondWith } of httpConn) {
      const url = new URL(request.url);

      const method = request.method as HttpMethod;
      const pathname = new URL(request.url).pathname as Pathname;

      let body = {};

      if (request.body) {
        if (request.headers.get("content-type")?.match(/json/)) {
          body = await request.json();
        }
      }

      const httpRequest = new HttpRequest(
        url.searchParams,
        body
      );

      const httpController = this.getHttpController(method, pathname);

      const response = await this.processHttpController(
        httpRequest,
        httpController
      );

      await respondWith(response);
    }
  }

  get(pathname: Pathname, controller: HttpController) {
    this.addRoute(HttpMethod.GET, pathname, controller);
    return this;
  }

  post(pathname: Pathname, controller: HttpController) {
    this.addRoute(HttpMethod.POST, pathname, controller);
    return this;
  }

  async listen(hostname: string, port: number) {
    const listener = Deno.listen({ hostname, port });

    for await (const conn of listener) {
      this.handleRequest(conn);
    }
  }
}
