import { APIGatewayEvent } from "aws-lambda";
import { EventStore } from "cqrs";
import { EventStoreRepository } from "../../common/repositories/event-store.repository.js";
import { SaleCommandHandler, SaleEventSourcingHandler } from "sale-core";
import { plainToInstance } from "class-transformer";
import { ChargeInsertionCommand } from "sale-core/dist/commands/charge-insertion.command.js";
import { randomUUID } from "crypto";

const eventStore = new EventStore(new EventStoreRepository(), 'SaleAggregate');
const eventSourcingHandler = new SaleEventSourcingHandler(eventStore);

const saleCommandHandler = new SaleCommandHandler(eventSourcingHandler);

export async function handler(event: APIGatewayEvent) {
  try {
    const command = plainToInstance(ChargeInsertionCommand, {
      id: '37e63663-8419-4657-97e4-718575818333',
      chargeId: randomUUID(),
      referenceMonth: '05/2024'
    });

    const result = await saleCommandHandler.handleCharge(command);

    return {
      statusCode: 201,
      body: JSON.stringify(result)
    };
  } catch(e) {
    console.error(e);
  }
}
