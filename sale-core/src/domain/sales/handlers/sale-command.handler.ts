import { EventSourcingHandler } from "cqrs";
import { SaleAggregate } from "../sale.js";
import { NewSaleCommand } from "../../../commands/new-sale.command.js";

export class SaleCommandHandler {
  private readonly _eventSourcingHandler: EventSourcingHandler<SaleAggregate>;

  constructor(eventSourcingHandler: EventSourcingHandler<SaleAggregate>) {
    this._eventSourcingHandler = eventSourcingHandler;
  }

  async handleNewSale(command: NewSaleCommand) {
    const aggregate = new SaleAggregate(command);
    return this._eventSourcingHandler.save(aggregate);
  }
}
