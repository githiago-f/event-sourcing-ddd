import { UUID } from "crypto";
import { ChargeLog } from "./charge-log.js";
import { SaleStatus } from "./vo/sale-status.js";
import { EventApplier, AggregateRoot } from "cqrs";
import { NewSaleEvent } from "./events/new-sale.event.js";
import { InsertChargeLogEvent } from "./events/charge-insertion.event.js";
import { NewSaleCommand } from "../commands/new-sale.command.js";
import { InsertChargeLogCommand } from "../commands/charge-insertion.command.js";
import { InvalidChargeLogInsertionException } from "./errors/invalid-chargelog-insertion.expection.js";
import { InvalidParameterException } from "./errors/invalid-parameter.exception.js";

export class SaleAggregate extends AggregateRoot {
  private _status!: SaleStatus;
  private _productCode!: string;
  private _recipientId!: string;
  private _instalationId!: string;
  private _chargeHistory!: Set<ChargeLog>;

  constructor(command?: NewSaleCommand, id?: UUID) {
    super(id);
    this._chargeHistory = new Set();
    if(command !== undefined) {
      if(command.instalationId === undefined) {
        throw new InvalidParameterException('instalationId');
      }
      if(command.recipientId === undefined) {
        throw new InvalidParameterException('recipientId');
      }
      if(command.productCode === undefined) {
        throw new InvalidParameterException('productCode');
      }
      this.raiseEvent(NewSaleEvent.fromCommand(command));
    }
  }

  public includeChargeLog(command: InsertChargeLogCommand) {
    if([SaleStatus.CANCELED, SaleStatus.REJECTED].includes(this._status)) {
      throw new InvalidChargeLogInsertionException(command.chargeId, this.id);
    }
    const event = InsertChargeLogEvent.fromCommand(command);
    this.raiseEvent(event);
  }

  @EventApplier(NewSaleEvent.name)
  private applySaleCreation(event: NewSaleEvent) {
    this._status = SaleStatus.PROCESSING;
    this._productCode = event.productCode;
    this._recipientId = event.recipientId;
    this._instalationId = event.instalationId;
  }

  @EventApplier(InsertChargeLogEvent.name)
  private applyChargeLogInsertion(event: InsertChargeLogEvent) {
    this._status = SaleStatus.BILLING;
    const charge = new ChargeLog(event);
    this._chargeHistory.add(charge);
  }
}
