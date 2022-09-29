import { CreateToDoRepository } from "./create-todo-repository.ts";
import { HttpController } from "./http-controller.ts";
import { HttpRequest } from "./http-request.ts";
import { HttpResponse } from "./http-response.ts";
import { HttpStatusCode } from "./http-status-code.ts";
import { Validation } from "./validation.ts";

export interface CreateToDoDTO {
  title: string;
}

export class CreateToDoHttpController implements HttpController {
  constructor(
    private readonly validation: Validation,
    private readonly createToDoRepository: CreateToDoRepository
  ) {}

  async handle(httpRequest: HttpRequest<CreateToDoDTO>) {
    const error = this.validation.validate(httpRequest.body)

    if (error) {
      const { message } = error;
      return new HttpResponse(HttpStatusCode.BAD_REQUEST, { message });
    }

    await this.createToDoRepository.create(httpRequest.body.title);

    return new HttpResponse(HttpStatusCode.NO_CONTENT);
  }
}
