import * as fs from "fs";
import * as path from "path";

type LogCategory = "info" | "error" | "debug";
type LogEntry = {
  category: LogCategory;
  message: string;
  timestamp: Date;
};

interface Formatter {
  format(entry: LogEntry): string;
}

interface Writer {
  write(entry: string): void;
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

class Logger {
  private formatter: Formatter | undefined;
  private writer: Writer | undefined;

  public setFormatter(formatter: Formatter): void {
    this.formatter = formatter;
  }
  public setWriter(writer: Writer): void {
    if (!this.formatter) {
      // ToDo: 🤢 client classes needs to call formatter before
      throw "Need a formatter";
    }
    if (this.formatter instanceof JsonFormatter && writer instanceof TextFileWriter) {
      // ToDo: 🤢 client classes will need to know too much about me
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
class Client {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
    this.logger.setFormatter(new JsonFormatter());
    this.logger.setWriter(new ConsoleWriter());
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
