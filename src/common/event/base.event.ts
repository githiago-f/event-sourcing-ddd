import { ClassConstructor } from "class-transformer";
import { UUID } from "crypto";

export abstract class BaseEvent {
  public readonly id!: UUID;
  public readonly abstract name: string;
  public version!: number;

  static events = new Map<string, ClassConstructor<any>>();
}
