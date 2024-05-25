import { UUID } from "crypto";

export abstract class BaseEvent {
  public readonly id!: UUID;
  public readonly abstract name: string;
}
