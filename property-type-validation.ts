import { Validation } from "./validation.ts";

type ValidationInput = Record<string, unknown>;

export class PropertyTypeValidation implements Validation {
  constructor(
    private readonly key: string,
    private readonly type: "string" | "number" | "boolean" | "object",
  ) {}

  validate(input: ValidationInput) {
    if (typeof input[this.key] !== this.type) {
      return new Error(
        `Property '${this.key}' was expected to have type '${this.type}'`
      );
    }

    return null;
  }
}
