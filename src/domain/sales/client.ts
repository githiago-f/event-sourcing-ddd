import { UUID } from "crypto";
import { Instalation } from "./installation.js";

export class Client {
  public readonly id!: UUID;
  public readonly instalation!: Instalation;
}
