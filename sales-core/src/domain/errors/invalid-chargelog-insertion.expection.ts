import { UUID } from "crypto";

export class InvalidChargeLogInsertionException extends Error {
  constructor(public readonly chargeId: string, public readonly saleId: UUID) {
    super(`Invalid record insertion on ${saleId}, with chargeId::${chargeId}`);
  }
}
