import { ClassConstructor } from "class-transformer";
import { instanceKey } from "../decorators/injectable.js";
export const injectableKey = Symbol("injectable-key");

export class IoCContainer {
  private readonly instances = new Map<string, InstanceType<any>>();
  public static readonly instance = new IoCContainer();

  register(key: string, instance: InstanceType<any>) {
    if(this.instances.has(key)) {
      throw new Error('There is already a instance for ' + key);
    }
    this.instances.set(key, instance);
  }

  get<T>(target: ClassConstructor<T>): T {
    const isInjectable = Reflect.getMetadata(injectableKey, target);
    if(!isInjectable) {
      throw new Error(target.name + ' is not injectable');
    }

    const key = Reflect.getMetadata(instanceKey, target);
    if(this.instances.has(key)) {
      return this.instances.get(key);
    }

    const paramTypes = Reflect.getMetadata("design:paramtypes", target);
    const dependencies = (paramTypes ?? []).map((dep: ClassConstructor<any>) =>this.get(dep));

    return Reflect.construct(target, dependencies);
  }
}
