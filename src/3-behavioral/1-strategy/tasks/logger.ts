import * as fs from "fs";
import * as path from "path";

export type LogCategory = "info" | "error" | "debug";
export type LogEntry = {
  category: LogCategory;
  message: string;
  timestamp: Date;
};

export interface Writer {
  write(entry: string): void;
}
export interface Formatter {
  format(entry: LogEntry): string;
}

export class ConsoleWriter implements Writer {
  public write(entry: string): void {
    console.log(entry);
  }
}
export class JsonFormatter implements Formatter {
  public format(entry: LogEntry): string {
    return JSON.stringify(entry);
  }
}

export class TextFileWriter implements Writer {
  private readonly filePath = path.resolve(__dirname, "./log.txt");
  public write(entry: string): void {
    fs.appendFileSync(this.filePath, entry + "\n");
  }
}

export class SimpleFormatter implements Formatter {
  public format(entry: LogEntry): string {
    return `${entry.timestamp.toISOString()} : [${entry.category}] ${entry.message}`;
  }
}

export class LoggerWriterFactory {
  public static createWriter(type: "console" | "textFile"): Writer {
    if (type === "console") {
      return new ConsoleWriter();
    } else {
      return new TextFileWriter();
    }
  }
}

export class LoggerFormatterFactory {
  public static createFormatter(type: "json" | "simple"): Formatter {
    if (type === "json") {
      return new JsonFormatter();
    } else {
      return new SimpleFormatter();
    }
  }
}

export class Logger {
  constructor(private readonly writer: Writer, private readonly formatter: Formatter) {}
  public log(entry: LogEntry) {
    this.writer.write(this.formatter.format(entry));
  }
}
