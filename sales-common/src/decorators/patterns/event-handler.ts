import "reflect-metadata";
import { injectableKey } from "../../core/patterns/ioc-container";
import { ClassConstructor } from "class-transformer";

export function EventHandler(event: ClassConstructor<unknown> | string): MethodDecorator {
  return function(target, property, descriptor) {
    const isInjectable = Reflect.getMetadata(injectableKey, target);
    if(!isInjectable) {
      throw new Error(`The method ${property.toString()} should be part of a injectable class`);
    }
    
  }
}
