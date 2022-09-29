import { CreateToDoRepository } from "./create-todo-repository.ts";

export class InMemoryToDoRepository implements CreateToDoRepository {
  private readonly todos: string[] = [];

  create(title: string) {
    this.todos.push(title);
    return Promise.resolve()
  }
}
