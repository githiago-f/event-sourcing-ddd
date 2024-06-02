export class InvalidMethodException extends Error {
  constructor(eventName: string) {
    super("Could not find an event applier for " + eventName);
  }
}
