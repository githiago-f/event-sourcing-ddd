import { BaseEvent } from './base.event.js';
import { type PostEventHandler } from './post-event.handler.js';

export class EventPropagator {
  private readonly _routes: Map<string, Set<PostEventHandler>>;
  public static readonly instance = new EventPropagator();

  private constructor() {
    this._routes = new Map();
  }

  registerHandler(eventType: string, postHandler: PostEventHandler) {
    const routes = this._routes.get(eventType) ?? new Set();
    routes.add(postHandler);
    this._routes.set(eventType, routes);
  }

  emit<T extends BaseEvent>(event: T) {
    if(!this._routes.get(event.name)) {
      console.log('No event handlers for ' + event.name);
      return;
    }
    this._routes.get(event.name)!.forEach(cb => cb(event));
  }
}
