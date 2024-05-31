import { plainToInstance } from "class-transformer";
import { SaleEventSourcingHandler, SaleCommandHandler } from 'sale-core';
import { EventStore } from "cqrs";
import { EventStoreRepository } from "../../common/repositories/event-store.repository.js";
import { APIGatewayEvent, Handler } from "aws-lambda";
import { SaleRequest } from "./dto/sale-request.js";
import { PostSaleDispatcher } from "./post-sale.dispatcher.js";
import { validateInput } from "../../common/infra/helpers/validate-input.js";

const eventStore = new EventStore(new EventStoreRepository(), 'SaleAggregate');
const eventSourcingHandler = new SaleEventSourcingHandler(eventStore);

const saleCommandHandler = new SaleCommandHandler(eventSourcingHandler);

// only instantiate, the methods will be called
// by IoC container
new PostSaleDispatcher();

export const handler: Handler<APIGatewayEvent> = async (event) => {
  const command = await validateInput<SaleRequest>(JSON.parse(event.body!), SaleRequest);

  const sale = await saleCommandHandler.handleNewSale(command.toCommand());
  return {
    statusCode: 200,
    body: JSON.stringify({ id: sale.id })
  };
}
