import { UUID } from "crypto";

// To be persisted
export class EventModel {
  public readonly id!: UUID;
  public readonly createdAt!: Date;
  public readonly aggreagateIdentifier!: string;
  public readonly aggregateType!: string;
  public readonly eventType!: string;
  public readonly version!: number;
  public readonly eventData!: string;
}
