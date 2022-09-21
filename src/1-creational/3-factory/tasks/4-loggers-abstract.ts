import * as fs from "fs";
import * as path from "path";

type LogCategory = "info" | "error" | "debug";
type LogEntry = {
  category: LogCategory;
  message: string;
  timestamp: Date;
};

interface Writer {
  write(entry: string): void;
}
interface Formatter {
  format(entry: LogEntry): string;
}

class JsonFormatter implements Formatter {
  public format(entry: LogEntry): string {
    return JSON.stringify(entry);
  }
}
class SimpleFormatter implements Formatter {
  public format(entry: LogEntry): string {
    return `${entry.timestamp.toISOString()} : [${entry.category}] ${entry.message}`;
  }
}
class ConsoleWriter implements Writer {
  public write(entry: string): void {
    console.log(entry);
  }
}
class TextFileWriter implements Writer {
  private readonly filePath = path.resolve(__dirname, "./log.txt");
  public write(entry: string): void {
    fs.appendFileSync(this.filePath, entry + "\n");
  }
}

class LoggerWriterFactory {
  public static createWriter(type: string): Writer {
    if (type === "console") {
      return new ConsoleWriter();
    } else {
      return new TextFileWriter();
    }
  }
}
class LoggerFormatterFactory {
  public static createFormatter(type: string): Formatter {
    if (type === "json") {
      return new JsonFormatter();
    } else {
      return new SimpleFormatter();
    }
  }
}

class LoggerAbstractFactory {
  public static create(
    factory: "formatter" | "writer",
    dependency: "console" | "textFile" | "json" | "simple"
  ): Writer | Formatter {
    if (factory == "formatter") {
      return LoggerFormatterFactory.createFormatter(dependency);
    } else {
      return LoggerWriterFactory.createWriter(dependency);
    }
    // ToDo: check for inconsistencies
  }
  public static create2(dependency: "console" | "textFile" | "json" | "simple"): Writer | Formatter {
    const factory = "formatter";
    if (factory == "formatter") {
      return LoggerFormatterFactory.createFormatter(dependency);
    } else {
      return LoggerWriterFactory.createWriter(dependency);
    }
    // ToDo: check for inconsistencies
  }
}

class Logger {
  constructor(private readonly formatter: Formatter, private readonly writer: Writer) {}
  public log(entry: LogEntry) {
    this.writer.write(this.formatter.format(entry));
  }
}

class Client {
  private readonly logger: Logger;
  constructor() {
    const formatter = LoggerAbstractFactory.create("formatter", "simple") as Formatter;
    const writer = LoggerAbstractFactory.create("writer", "console") as Writer;
    this.logger = new Logger(formatter, writer);
    // ! useful for generic injection systems with previous registering processes
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
