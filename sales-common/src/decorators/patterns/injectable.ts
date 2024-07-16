import "reflect-metadata";
import { injectableKey } from "../../core/patterns/ioc-container";

type Options = {
  key?: string;
}

export const instanceKey = Symbol('instance-key');

export function Injectable(ops?: Options): ClassDecorator {
  return (target) => {
    if(ops) {
      Reflect.defineMetadata(instanceKey, ops.key, target);
    }
    Reflect.defineMetadata(injectableKey, true, target);
  }
}
