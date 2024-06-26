import { ClassConstructor } from "class-transformer";
import { UUID, randomUUID } from "crypto";

export abstract class BaseEvent {
  public readonly id!: UUID;
  public readonly abstract name: string;
  public version!: number;

  static events = new Map<string, ClassConstructor<any>>();

  constructor(id?: UUID) {
    this.id = id ?? randomUUID();
  }
}
