import { ValidationError } from "class-validator";

export class ValidationException extends Error {
  public readonly statusCode = 422;
  public readonly body: Record<string, ValidationError[]>;

  constructor(errors: ValidationError[]) {
    super(`Error on request data validation`);
    this.body = errors.reduce((acc, v) => {
      acc[v.property] = acc[v.property] || [];
      acc[v.property].push(v);
      return acc;
    }, {} as Record<string, ValidationError[]>);
  }
}
