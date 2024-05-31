import { SQSBatchItemFailure, SQSBatchResponse, SQSEvent } from "aws-lambda";
import { EventStore } from "cqrs";
import { EventStoreRepository } from "../../common/repositories/event-store.repository.js";
import { SaleCommandHandler, SaleEventSourcingHandler } from "sale-core";
import { validateInput } from "../../common/infra/helpers/validate-input.js";
import { ChargeInsertionRequest } from "./dto/charge-insertion.request.js";

const eventStore = new EventStore(new EventStoreRepository(), 'SaleAggregate');
const eventSourcingHandler = new SaleEventSourcingHandler(eventStore);

const saleCommandHandler = new SaleCommandHandler(eventSourcingHandler);

export async function handler(event: SQSEvent): Promise<SQSBatchResponse> {
  const batchItemFailures: SQSBatchItemFailure[] = [];
  for (const message of event.Records) {
    try {
      const request = await validateInput<ChargeInsertionRequest>(
        JSON.parse(message.body!),
        ChargeInsertionRequest
      );
      await saleCommandHandler.handleCharge(request.toCommand());
    } catch(e) {
      batchItemFailures.push({ itemIdentifier: message.messageId });
    }
  }
  return { batchItemFailures };
}
