import { CreateToDoHttpController } from "./create-todo-http-controller.ts";
import { InMemoryToDoRepository } from "./in-memory-todo-repository.ts";
import { PropertyTypeValidation } from "./property-type-validation.ts";
import { RequiredPropertyValidation } from "./required-property-validation.ts";
import { ValidationComposite } from "./validation-composite.ts";

export class CreateToDoHttpControllerFactory {
  static make() {
    return new CreateToDoHttpController(
      new ValidationComposite([
        new RequiredPropertyValidation("title"),
        new PropertyTypeValidation("title", "string"),
      ]),
      new InMemoryToDoRepository()
    );
  }
}
