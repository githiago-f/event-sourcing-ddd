import { randomUUID } from "node:crypto";

export abstract class BaseEvent {
  public readonly id!: string;
  public readonly version!: number;
  public abstract readonly eventName: string;

  protected constructor(version = -1, id = randomUUID()) {
    this.id = id;
    this.version = version;
  }
}
