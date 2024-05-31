import { BaseEvent } from './base.event.js';

export type PostEventHandler = <T extends BaseEvent> (event: T) => Promise<void>
