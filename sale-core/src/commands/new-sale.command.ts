import { UUID } from "crypto";
import { BaseCommand } from "cqrs";

export class NewSaleCommand extends BaseCommand {
  readonly name = 'NewSaleCommand';
  public readonly recipientId!: UUID;
  public readonly instalationId!: UUID;
  public readonly productCode!: string;
}
