import { ConsoleWriter, JsonFormatter, LogEntry, Logger, SimpleFormatter, TextFileWriter } from "./logger";

export class LoggerStrategyFactory {
  private static defaultStrategy = new Logger(new ConsoleWriter(), new SimpleFormatter());
  private static productionStrategy = new Logger(new TextFileWriter(), new JsonFormatter());
  public static chooseStrategy(): Logger {
    // ! chosen on environment basis
    const environment = process.env.NODE_ENV;
    if (environment === "production") {
      return this.productionStrategy;
    } else {
      return this.defaultStrategy;
    }
  }
}

export class Client {
  private readonly logger = LoggerStrategyFactory.chooseStrategy();
  public log(entry: LogEntry) {
    this.logger.log(entry);
  }
}

const client = new Client();
client.log({
  category: "info",
  message: "Hello World",
  timestamp: new Date(),
});
