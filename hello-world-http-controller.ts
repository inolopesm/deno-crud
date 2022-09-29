import { HttpController } from "./http-controller.ts";
import { HttpRequest } from "./http-request.ts";
import { HttpResponse } from "./http-response.ts";
import { HttpStatusCode } from "./http-status-code.ts";

export class HelloWorldHttpController implements HttpController {
  constructor() {}

  handle(httpRequest: HttpRequest) {
    const name = httpRequest.query.get("name");
    const message = name ? `Hello World, ${name}!` : "Hello World!";
    const response = new HttpResponse(HttpStatusCode.OK, { message });
    return Promise.resolve(response);
  }
}
