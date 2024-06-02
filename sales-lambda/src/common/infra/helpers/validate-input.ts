import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "./validation.exception.js";

export async function validateInput<T>(input: T, dtoType: ClassConstructor<T>) {
  const parsed = plainToInstance(dtoType, input);
  const errors = await validate(parsed as object);
  if(errors.length > 0) {
    throw new ValidationException(errors);
  }
  return parsed;
}
