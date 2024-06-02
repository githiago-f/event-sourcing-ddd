import { Injectable } from "sales-common";
import { SaleAggregate } from "../sale.js";
import { NewSaleCommand } from "../../commands/new-sale.command.js";
import { InsertChargeLogCommand } from "../../commands/charge-insertion.command.js";
import { SaleEventSourcingHandler } from "./sale-event-sourcing.handler.js";

@Injectable()
export class SaleCommandHandler {
  private readonly _eventSourcingHandler: SaleEventSourcingHandler;

  constructor(eventSourcingHandler: SaleEventSourcingHandler) {
    this._eventSourcingHandler = eventSourcingHandler;
  }

  async handleNewSale(command: NewSaleCommand) {
    const aggregate = new SaleAggregate(command);
    return this._eventSourcingHandler.save(aggregate);
  }

  async handleCharge(command: InsertChargeLogCommand) {
    const aggregate = await this._eventSourcingHandler.findById(command.id);
    aggregate.includeChargeLog(command);
    return this._eventSourcingHandler.save(aggregate);
  }
}
