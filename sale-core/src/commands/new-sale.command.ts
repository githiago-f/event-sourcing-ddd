import { UUID } from "crypto";
import { BaseCommand } from "cqrs";

export class NewSaleCommand extends BaseCommand {
  readonly name = 'NewSaleCommand';
  public readonly productCode!: string;
  public readonly recipientId!: UUID;
  public readonly financialResponsibleId?: UUID;
}
