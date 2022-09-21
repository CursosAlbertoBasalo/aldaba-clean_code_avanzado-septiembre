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

  constructor(public formatter: "json" | "simple", public writer: "console" | "textFile") {}

  public log(entry: LogEntry) {
    if (!this.writer || !this.formatter) {
      throw new Error("Logger is not configured");
    }
    let message = "";
    if (this.formatter == "json") {
      message = this.formatJSON(entry);
    } else {
      message = this.formatSimple(entry);
    }
    if (this.writer == "console") {
      this.writeConsole(message);
    } else {
      this.writeFile(message);
    }
    // ToDo: 🤢 what happens when a new formatter or writer arrives?
  }

  private formatJSON(entry: LogEntry): string {
    return JSON.stringify(entry);
  }

  private formatSimple(entry: LogEntry): string {
    return `${entry.timestamp.toISOString()} : [${entry.category}] ${entry.message}`;
  }

  private writeConsole(entry: string): void {
    console.log(entry);
  }

  private writeFile(entry: string): void {
    fs.appendFileSync(this.filePath, entry + "\n");
  }
}

class Client {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger("simple", "console");
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
