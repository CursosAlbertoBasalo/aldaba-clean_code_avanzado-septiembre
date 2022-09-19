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
  public static create(dependency: "console" | "textFile" | "json" | "simple"): Writer | Formatter {
    if (["console", "textFile"].includes(dependency)) {
      return LoggerWriterFactory.createWriter(dependency);
    } else {
      return LoggerFormatterFactory.createFormatter(dependency);
    }
  }
}

class Logger {
  constructor(private readonly writer: Writer, private readonly formatter: Formatter) {}
  public log(entry: LogEntry) {
    this.writer.write(this.formatter.format(entry));
  }
}

class Client {
  private readonly logger: Logger;
  constructor() {
    const writer = LoggerAbstractFactory.create("console") as Writer;
    const formatter = LoggerAbstractFactory.create("simple") as Formatter;
    this.logger = new Logger(writer, formatter);
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
