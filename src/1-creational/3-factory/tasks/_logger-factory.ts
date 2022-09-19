import * as fs from "fs";
import * as path from "path";

type LogCategory = "info" | "error" | "debug";
type LogEntry = {
  category: LogCategory;
  message: string;
  timestamp: Date;
};

class Logger {
  private readonly filePath = path.resolve(__dirname, "./log.txt");

  constructor(public formatter = "JSON", public writer = "Console") {}

  public log(entry: LogEntry) {
    if (!this.writer || !this.formatter) {
      throw new Error("Logger is not configured");
    }
    let message = "";
    if (this.formatter == "JSON") {
      message = this.formatJSON(entry);
    } else {
      message = this.formatSimple(entry);
    }
    if (this.writer == "Console") {
      this.writeConsole(message);
    } else {
      this.writeFile(message);
    }
  }

  private writeConsole(entry: string): void {
    console.log(entry);
  }

  private writeFile(entry: string): void {
    fs.appendFileSync(this.filePath, entry + "\n");
  }

  private formatJSON(entry: LogEntry): string {
    return JSON.stringify(entry);
  }

  private formatSimple(entry: LogEntry): string {
    return `${entry.timestamp.toISOString()} : [${entry.category}] ${entry.message}`;
  }
}

class Client {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
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
