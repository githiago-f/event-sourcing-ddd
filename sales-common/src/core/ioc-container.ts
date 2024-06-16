import { ClassConstructor } from "class-transformer";
import { instanceKey } from "../decorators/injectable.js";
import { NotInjectableException, UniqueInstanceException } from "../errors/index.js";
export const injectableKey = Symbol("injectable-key");

export class IoCContainer {
  private readonly instances = new Map<string, InstanceType<any>>();
  public static readonly instance = new IoCContainer();

  register(key: string, instance: InstanceType<any>) {
    if(this.instances.has(key)) {
      throw new UniqueInstanceException(key);
    }
    this.instances.set(key, instance);
  }

  get<T>(target: ClassConstructor<T>): T {
    const isInjectable = Reflect.getMetadata(injectableKey, target);
    if(!isInjectable) {
      throw new NotInjectableException(target.name);
    }

    const key = Reflect.getMetadata(instanceKey, target) ?? target.name;
    if(this.instances.has(key)) {
      return this.instances.get(key);
    }

    return this.makeNewInstance<T>(target);
  }

  private makeNewInstance<T>(target: ClassConstructor<T>) {
    const paramTypes = Reflect.getMetadata("design:paramtypes", target);
    const dependencies = (paramTypes ?? []).map(this.get.bind(this));

    const instance = Reflect.construct(target, dependencies);
    this.instances.set(target.name, instance);
    return instance;
  }
}
