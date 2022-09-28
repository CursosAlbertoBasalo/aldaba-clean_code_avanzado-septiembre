import { ConsoleWriter, Formatter, JsonFormatter, LogEntry, SimpleFormatter, TextFileWriter, Writer } from "./logger";

export type EntryStrategy = { writer: Writer; formatter: Formatter };

export class EntryStrategyFactory {
  private static defaultStrategy: EntryStrategy = { writer: new ConsoleWriter(), formatter: new SimpleFormatter() };
  private static errorStrategy: EntryStrategy = { writer: new TextFileWriter(), formatter: new JsonFormatter() };

  public static chooseStrategy(entry: LogEntry): EntryStrategy {
    // ! chosen on parameter basis
    // * clean: replace if with a lookup table
    if (entry.category === "error") {
      return EntryStrategyFactory.errorStrategy;
    } else {
      return EntryStrategyFactory.defaultStrategy;
    }
  }
}

// ! redefine Logger class
export class Logger {
  public log(entry: LogEntry) {
    const strategy = EntryStrategyFactory.chooseStrategy(entry);
    strategy.writer.write(strategy.formatter.format(entry));
  }
}

export class Client {
  private readonly logger: Logger = new Logger();
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
client.log({
  category: "error",
  message: "The world is ending",
  timestamp: new Date(),
});
