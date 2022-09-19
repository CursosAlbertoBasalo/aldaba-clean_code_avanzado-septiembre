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

class Logger {
  public writer: Writer | undefined;
  public formatter: Formatter | undefined;

  public log(entry: LogEntry) {
    if (!this.writer || !this.formatter) {
      throw new Error("Logger is not configured");
    }
    this.writer.write(this.formatter.format(entry));
  }
}

class LoggerBuilder {
  private logger: Logger = new Logger();
  public setWriter(writer: Writer): LoggerBuilder {
    this.logger.writer = writer;
    return this;
  }
  public setFormatter(formatter: Formatter): LoggerBuilder {
    this.logger.formatter = formatter;
    return this;
  }
  public build(): Logger {
    return this.logger;
  }
}

class LoggerDirector {
  public static buildDefault(): Logger {
    const builder = new LoggerBuilder();
    return builder.setFormatter(new SimpleFormatter()).setWriter(new ConsoleWriter()).build();
  }
  public static buildFancy(): Logger {
    const builder = new LoggerBuilder();
    return builder.setFormatter(new JsonFormatter()).setWriter(new TextFileWriter()).build();
  }
}

class Client {
  private readonly logger: Logger;
  constructor() {
    this.logger = LoggerDirector.buildDefault();
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
