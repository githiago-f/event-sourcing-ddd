import { UUID } from "crypto";
import { Instalation } from "./installation";

export class Client {
  public readonly id!: UUID;
  public readonly instalation!: Instalation;
}
