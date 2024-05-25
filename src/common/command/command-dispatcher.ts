import { BaseCommand } from "./base.command";
import { CommandHandler } from "./command.handler";

export class EventDispatcher {
  private _routes = new Map<string, Set<CommandHandler>>();

  registerHandler(type: string, handler: CommandHandler): void {
    const handlers = this._routes.get(type) ?? new Set();
    handlers.add(handler);
    this._routes.set(type, handlers);
  }

  send(command: BaseCommand) {
    const handlers = this._routes.get(command.name) ?? [];
    handlers.forEach(handler => handler(command));
  }
}
