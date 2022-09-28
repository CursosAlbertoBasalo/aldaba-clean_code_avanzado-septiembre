import { LogCategory, LogEntry, Logger } from "./logger";
export interface Observer {
  notify(businessEvent: string, message: string): void;
}

/**
 * A Logger wrapper that implements the Observer interface.
 * Is a decorator that adds the notify method to the Logger class.
 */
export class LoggerObserver implements Observer {
  private logger: Logger = new Logger();
  public notify(businessEvent: string, message: string) {
    const entry: LogEntry = {
      category: this.adaptBusinessEvent(businessEvent),
      message: businessEvent + " - " + message,
      timestamp: new Date(),
    };
    this.logger.log(entry);
  }

  private adaptBusinessEvent(businessEvent: string): LogCategory {
    return businessEvent === "exception" ? "error" : "info";
  }
}
