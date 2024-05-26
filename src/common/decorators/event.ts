import { ClassConstructor } from "class-transformer";
import { BaseEvent } from "../event/base.event"

export function EventImpl(): ClassDecorator {
  return (target) => {
    console.log('Incliding event implemention on events list::', target.name);
    BaseEvent.events.add(target as unknown as ClassConstructor<any>);
  }
}
