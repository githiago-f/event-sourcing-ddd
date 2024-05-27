import { UUID } from "crypto";
import { BaseCommand } from "../common/command/base.command.js";

export class NewSaleCommand extends BaseCommand {
  readonly name = 'NewSaleCommand';
  public readonly productCode!: string;
  public readonly recipientId!: UUID;
  public readonly financialResponsibleId?: UUID;
}
