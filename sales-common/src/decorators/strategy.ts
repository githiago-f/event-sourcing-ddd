import "reflect-metadata";
import { AbstractClass } from "../utils/abstract-class.type";
import { injectableKey } from "../core/ioc-container";

export type StrategyOptions = {
  key: string;
}

export const strategyKey = Symbol('strategy-key');

export function Strategy(options: StrategyOptions): ClassDecorator {
  return function (target) {
    const proto = target.prototype;
    const parentConstructor: AbstractClass = Object.getPrototypeOf(proto).constructor;

    Reflect.defineMetadata('design:baseclass', parentConstructor, target);
    Reflect.defineMetadata(strategyKey, options.key, target);
    Reflect.defineMetadata(injectableKey, true, target);
  }
}
