import { BaseEvent } from "sales-common/src/event/base.event";

export abstract class EventDispatcher {
  abstract dispatch<T extends BaseEvent>(event: T, eventSource?: string): Promise<void>;
}
