import { EVENT_STORE_KEY, EventStore, IoCContainer } from "cqrs";
import { APIGatewayEvent } from "aws-lambda";
import { SaleRequest } from "./dto/sale-request.js";
import { SaleCommandHandler } from 'sale-core';
import { validateInput } from "../../common/infra/helpers/validate-input.js";
import { EventStoreRepository } from "../../common/repositories/event-store.repository.js";

const eventStore = new EventStore(new EventStoreRepository(), 'SaleAggregate');
IoCContainer.instance.register(EVENT_STORE_KEY, eventStore);

const saleCommandHandler = IoCContainer.instance.get(SaleCommandHandler);

export async function handler(event: APIGatewayEvent) {
  const command = await validateInput<SaleRequest>(JSON.parse(event.body!), SaleRequest);

  const sale = await saleCommandHandler.handleNewSale(command.toCommand());
  return {
    statusCode: 200,
    body: JSON.stringify({ id: sale.id })
  };
}
