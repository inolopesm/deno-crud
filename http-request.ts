export class HttpRequest<Body = any> {
  constructor(public readonly query: URLSearchParams, public readonly body: Body) {}
}
