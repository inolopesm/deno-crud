export interface Validation<ValidationInput = any> {
  validate: (input: ValidationInput) => Error | null;
}
