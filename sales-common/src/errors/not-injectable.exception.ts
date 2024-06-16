import { ClassConstructor } from "class-transformer";

export class NotInjectableException extends Error {
  constructor(target: ClassConstructor<any> | string) {
    const className = typeof target === 'string' ? target : target.name;
    super(className + ' is not injectable');
  }
}
