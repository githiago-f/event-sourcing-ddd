import "reflect-metadata";
import { ClassConstructor } from "class-transformer";
import { instanceKey } from "../../decorators/patterns/injectable";
import { NotInjectableException, UniqueInstanceException } from "../../errors/index";
import { AbstractClass } from "../../utils/abstract-class.type";
import { strategyKey } from "../../decorators/patterns/strategy";
export const injectableKey = Symbol("injectable-key");

type StrategiesField = Map<AbstractClass, Record<string, Function>>;

export class IoCContainer {
  private readonly strategies: StrategiesField = new Map();
  private readonly injectables = new Map<string, InstanceType<any>>();
  public static readonly instance = new IoCContainer();

  /**
   * @param base base class (usually abstract) of this strategy
   * @param key should be unique on the current context
   * @param strategy the class that will be constructed
   */
  useStrategies(...strategies: Function[]) {
    strategies.forEach(strategy => {
      console.debug(`Defining strategy for ${strategy.name}`);
      const base = Reflect.getMetadata('design:baseclass', strategy);
      const key = Reflect.getMetadata(strategyKey, strategy);
      console.debug(`Strategy base-class:: ${base.name}`);
      console.debug(`Strategy key:: ${key}`);

      const currentStrategies = this.strategies.get(base) ?? {};
      currentStrategies[key] = strategy;

      this.strategies.set(base, currentStrategies);
    });
  }

  /**
   * @deprecated should not be used on any other contexts except StrategyFactory
   * @param base base class (usually abstract) of this strategy
   * @param key unique key that identifies the class
   * @returns the constructed class
   */
  getStrategy<T extends AbstractClass>(base: AbstractClass, key: string) {
    const instantiable = this.strategies.get(base);
    if(!instantiable) {
      throw new Error(`No implemention for strategy ${base.name}`);
    }
    if(!instantiable[key]) {
      throw new Error(`No implmention of strategy for key ${key}`);
    }
    return this.get<T>(instantiable[key] as ClassConstructor<T>);
  }

  /**
   * Registers a unique instance to be used on the context.
   *
   * @param key the unique key of this instance (use a reference of a Symbol)
   * @param instance the unique instance that will be used
   */
  register(key: string, instance: InstanceType<any>) {
    if(this.injectables.has(key)) {
      throw new UniqueInstanceException(key);
    }
    this.injectables.set(key, instance);
  }


  /**
   * @description
   * Accesses the instance by checking if the target can be instantiated
   * by the IoC-container
   * @param target the desired class
   * @returns the desired class instance
   */
  get<T>(target: ClassConstructor<T>): T {
    const isInjectable = Reflect.getMetadata(injectableKey, target);
    if(!isInjectable) {
      throw new NotInjectableException(target.name);
    }

    const key = Reflect.getMetadata(instanceKey, target) ?? target.name;
    if(this.injectables.has(key)) {
      return this.injectables.get(key);
    }

    return this.makeNewInstance<T>(target);
  }

  private makeNewInstance<T>(target: ClassConstructor<T>) {
    const paramTypes = Reflect.getMetadata("design:paramtypes", target);
    const dependencies = (paramTypes ?? []).map(this.get.bind(this));

    const instance = Reflect.construct(target, dependencies);
    this.injectables.set(target.name, instance);
    return instance;
  }
}
