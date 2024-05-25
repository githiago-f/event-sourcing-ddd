import { UUID } from "crypto";
import { BaseEvent } from "../../../common/event/base.event";
import { NewSaleCommand } from "../../../commands/new-sale.command";
import { plainToInstance } from "class-transformer";

export class NewSaleEvent extends BaseEvent {
  readonly name = 'NewSaleEvent';

  public readonly productCode!: string;
  public readonly recipientId!: UUID;
  public readonly financialResponsibleId?: UUID;

  static fromCommand(command: NewSaleCommand) {
    return plainToInstance(NewSaleEvent, {
      productCode: command.productCode
    } as NewSaleEvent);
  }
}
