import { HttpStatusCode } from "./http-status-code.ts";

export class HttpResponse {
  constructor(
    public readonly statusCode: HttpStatusCode,
    public readonly body: Record<string, unknown> | null = null
  ) {}
}
