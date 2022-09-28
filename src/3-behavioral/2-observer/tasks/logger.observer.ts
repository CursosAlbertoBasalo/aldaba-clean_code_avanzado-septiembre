import { Logger } from "./logger";

export interface Observer {
  notify(businessEvent: string, message: string): void;
}

export class LoggerObserver implements Observer {
  private logger: Logger = new Logger();
  notify(businessEvent: string, message: string): void {
    throw new Error("Method not implemented.");
  }
}
