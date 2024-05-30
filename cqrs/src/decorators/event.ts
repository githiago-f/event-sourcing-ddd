import { ClassConstructor, plainToInstance } from "class-transformer";
import { BaseEvent } from "../event/base.event.js"

export function EventImpl(): ClassDecorator {
  return (target) => {
    const Target = target as unknown as ClassConstructor<BaseEvent>;
    const targetName = plainToInstance(Target, {}).name;
    if(targetName === undefined) {
      throw new Error(`Invalid event ${Target.name} should extend BaseEvent`);
    }
    console.log('Incliding event implemention on events list::', targetName);
    BaseEvent.events.set(targetName,  Target);
  }
}
