import "reflect-metadata";
import { BaseEvent } from "../event/base.event";
import { InvalidMethodException } from "./invalid-method.exception";

const applyMetadataKey = Symbol("apply-aggregate-event");

type Method = (event: BaseEvent) => void;

/**
 * Mark a aggregate method as event applier.
 * It will be used to apply a event, and one event can only be
 * handled by one method.
 */
export function EventApplier(eventName: string): MethodDecorator {
  return (target, _, descriptor) => {
    const method = descriptor.value!;
    let eventAppliers: Map<string, Method> =
      Reflect.getMetadata(applyMetadataKey, target) ??
      new Map();
    eventAppliers.set(eventName, method as Method);
    Reflect.defineMetadata(applyMetadataKey, eventAppliers, target);
    return method;
  };
}

export function getHandlerMethod(target: any, eventName: string) {
  const appliers: Map<string, Method> = Reflect.getMetadata(
    applyMetadataKey,
    target,
  ) ?? new Map();
  if (appliers.has(eventName)) {
    return appliers.get(eventName);
  }
  throw new InvalidMethodException(eventName);
}
