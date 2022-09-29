import { Validation } from "./validation.ts";

type ValidationInput = Record<string, unknown>;

export class RequiredPropertyValidation implements Validation {
  constructor(private readonly key: string) {}

  validate(input: ValidationInput) {
    if (typeof input[this.key] === "undefined") {
      return new Error(`Property '${this.key}' is required`);
    }

    return null;
  }
}
