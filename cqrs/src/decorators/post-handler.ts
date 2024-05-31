import { EventPropagator } from '../event/event.propagator.js';
import { PostEventHandler } from '../event/post-event.handler.js';

export function PostHandler(eventType: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const method = descriptor.value! as PostEventHandler;

    console.log(`Register method ${propertyKey.toString()}`);
    EventPropagator.instance.registerHandler(eventType, (event) => {
      console.log(`Post-Persistence:: ${event.name} on ${propertyKey.toString()} event handler`);
      return method.call(target, event);
    });
    return method as TypedPropertyDescriptor<any>;
  }
}
