import { Injectable } from "../../decorators";
import { AbstractClass } from "../../utils/abstract-class.type";
import { IoCContainer } from "./ioc-container";

@Injectable()
export class StrategyFactory<T> {
  with(base: AbstractClass) {
    return {
      get(strategyKey: string): T {
        return IoCContainer.instance.getStrategy(base, strategyKey) as T;
      }
    };
  }
}
