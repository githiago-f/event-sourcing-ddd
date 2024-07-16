import { IoCContainer } from "sales-common";
import { APIGatewayEvent } from "aws-lambda";
import { SaleCommandHandler, SaleAggregate } from 'sales-core';
import { SaleRequest } from "./dto/sale-request";
import { validateInput } from "../../common/infra/helpers/validate-input";
import { makeEventStoreFor } from "../../common/infra/dynamoose/event-store.include";

makeEventStoreFor(SaleAggregate);
const saleCommandHandler = IoCContainer.instance.get(SaleCommandHandler);

export async function handler(event: APIGatewayEvent) {
  const command = await validateInput<SaleRequest>(JSON.parse(event.body!), SaleRequest);

  const sale = await saleCommandHandler.handleNewSale(command.toCommand());
  return {
    statusCode: 200,
    body: JSON.stringify({ id: sale.id })
  };
}
