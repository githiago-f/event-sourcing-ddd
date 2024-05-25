import { UUID } from "crypto";

export abstract class BaseCommand {
  public readonly id!: UUID;
  public readonly abstract name: string;
}
