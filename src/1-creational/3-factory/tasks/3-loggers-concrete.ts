import * as fs from "fs";
import * as path from "path";

export type LogCategory = "info" | "error" | "debug";
export type LogEntry = {
  category: LogCategory;
  message: string;
  timestamp: Date;
};
export interface Formatter {
  format(entry: LogEntry): string;
}
export class JsonFormatter implements Formatter {
  public format(entry: LogEntry): string {
    return JSON.stringify(entry);
  }
}
export class SimpleFormatter implements Formatter {
  public format(entry: LogEntry): string {
    return `${entry.timestamp.toISOString()} : [${entry.category}] ${entry.message}`;
  }
}
export class LoggerFormatterFactory {
  private static readonly default = "simple";
  public static create(type: "json" | "simple"): Formatter {
    if (!type) {
      // ! could be based on environment variables instead of concrete parameters
      type = LoggerFormatterFactory.default;
    }
    if (type === "json") {
      return new JsonFormatter();
    } else {
      return new SimpleFormatter();
    }
  }
}

export interface Writer {
  write(entry: string): void;
}
export class ConsoleWriter implements Writer {
  public write(entry: string): void {
    console.log(entry);
  }
}
export class TextFileWriter implements Writer {
  private readonly filePath = path.resolve(__dirname, "./log.txt");
  public write(entry: string): void {
    fs.appendFileSync(this.filePath, entry + "\n");
  }
}
export class LoggerWriterFactory {
  public static create(type: "console" | "textFile"): Writer {
    if (type === "console") {
      return new ConsoleWriter();
    } else {
      return new TextFileWriter();
    }
  }
}

export class Logger {
  constructor(private readonly formatter: Formatter, private readonly writer: Writer) {}
  public log(entry: LogEntry) {
    this.writer.write(this.formatter.format(entry));
  }
}

export class LoggerFactorized {
  private readonly formatter!: Formatter;
  private readonly writer!: Writer;
  constructor(public formatterType: "json" | "simple", public writerType: "console" | "textFile") {
    this.formatter = LoggerFormatterFactory.create(formatterType);
    this.writer = LoggerWriterFactory.create(writerType);
  }
  public log(entry: LogEntry) {
    this.writer.write(this.formatter.format(entry));
  }
}

export class Client {
  private readonly logger: Logger;
  constructor() {
    // ! use factories to instantiate objects of certain types
    const formatter = LoggerFormatterFactory.create("json");
    const writer = LoggerWriterFactory.create("textFile");
    this.logger = new Logger(formatter, writer);
  }
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
