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
  private formatter: Formatter | undefined;
  private writer: Writer | undefined;

  public setFormatter(formatter: Formatter): void {
    this.formatter = formatter;
  }
  public setWriter(writer: Writer): void {
    if (!this.formatter) {
      throw "Need a formatter";
    }
    if (this.formatter instanceof JsonFormatter && writer instanceof TextFileWriter) {
      throw "Incompatible formatter";
    }
    this.writer = writer;
  }
  public log(entry: LogEntry) {
    if (!this.writer || !this.formatter) {
      throw new Error("Logger is not configured");
    }
    this.writer.write(this.formatter.format(entry));
  }
}

class LoggerBuilder {
  public static build(formatter: Formatter, writer: Writer): Logger {
    if (formatter instanceof JsonFormatter && writer instanceof TextFileWriter) {
      throw "Incompatible formatter";
    }
    const logger = new Logger();
    logger.setFormatter(new JsonFormatter());
    logger.setWriter(new ConsoleWriter());
    return logger;
  }
}

// ! another abstraction on top of the builder to give clients what they want without knowing the internals
class LoggerDirector {
  public static buildDefault(): Logger {
    return LoggerBuilder.build(new SimpleFormatter(), new TextFileWriter());
  }
  public static buildFancy(): Logger {
    return LoggerBuilder.build(new JsonFormatter(), new ConsoleWriter());
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
