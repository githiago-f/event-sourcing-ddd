import { EventBridge, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { EventDispatcher, BaseEvent } from "sales-common";

export class EBAdapter extends EventDispatcher {
  private readonly _eventBridge: EventBridge;

  constructor() {
    super();
    this._eventBridge = new EventBridge({ region: process.env.REGION });
  }

  async dispatch<T extends BaseEvent>(event: T, eventSource: string): Promise<void> {
    const command = new PutEventsCommand({
      Entries: [
        {
          Detail: JSON.stringify(event),
          DetailType: Object.getPrototypeOf(event),
          EventBusName: process.env.EVENT_BUS_NAME,
          /**
           * change this on need
           */
          Source: eventSource ?? 'event-store'
        }
      ]
    });
    await this._eventBridge.send(command);
  }
}
