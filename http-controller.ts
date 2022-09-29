import { HttpRequest } from "./http-request.ts";
import { HttpResponse } from "./http-response.ts";

export interface HttpController {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
