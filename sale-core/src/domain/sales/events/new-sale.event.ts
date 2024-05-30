import { UUID } from "crypto";
import { plainToInstance } from "class-transformer";
import { EventImpl, BaseEvent } from "cqrs";
import { NewSaleCommand } from "../../../commands/new-sale.command.js";

@EventImpl()
export class NewSaleEvent extends BaseEvent {
  readonly name = 'NewSaleEvent';

  public readonly productCode!: string;
  public readonly recipientId!: UUID;
  public readonly financialResponsibleId?: UUID;

  static fromCommand(command: NewSaleCommand) {
    return plainToInstance(NewSaleEvent, {
      productCode: command.productCode,
      recipientId: command.recipientId,
      financialResponsibleId: command.financialResponsibleId
    } as NewSaleEvent);
  }
}
