import { CommonEvent, CommonEventService } from "./common-event.library";
import { ConsoleWriter, Formatter, LogEntry, Logger } from "./logger";

export class CommonEventFormatAdapter implements Formatter {
  private readonly commonEventService: CommonEventService = new CommonEventService();

  public format(entry: LogEntry): string {
    // ! adapt ours to theirs
    const commonEvent = this.adaptLogEntryToCommonEvent(entry);
    // ! make use of adapted functionality
    const commonEventMessage = this.commonEventService.createMessage(commonEvent);
    // ! adapt theirs to ours
    const logMessage = this.adaptCommonEventToLogMessage(commonEventMessage);
    return logMessage;
  }

  private adaptLogEntryToCommonEvent(entry: LogEntry): CommonEvent {
    return {
      date: entry.timestamp,
      host: "localhost",
      device: "myApp",
      severity: entry.category === "info" ? 0 : 1,
      extension: [`msg=${entry.message}`],
    };
  }
  private adaptCommonEventToLogMessage(eventMessage: string[]): string {
    return eventMessage.join("\n");
  }
}

export class Client {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(new CommonEventFormatAdapter(), new ConsoleWriter());
  }
  public doThings() {
    this.logger.log({
      category: "info",
      message: "Hello World",
      timestamp: new Date(),
    });
  }
}

const client = new Client();
client.doThings();
