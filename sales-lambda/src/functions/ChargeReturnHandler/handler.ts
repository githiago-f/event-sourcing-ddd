import { IoCContainer } from "sales-common";
import { SQSBatchItemFailure, SQSBatchResponse, SQSEvent } from "aws-lambda";
import { ChargeInsertionRequest } from "./dto/charge-insertion.request.js";
import { validateInput } from "../../common/infra/helpers/validate-input.js";
import { SaleCommandHandler, SaleAggregate } from "sales-core";
import { makeEventStoreFor } from "../../common/infra/dynamoose/event-store.include.js";

makeEventStoreFor(SaleAggregate);
const saleCommandHandler = IoCContainer.instance.get(SaleCommandHandler);

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
