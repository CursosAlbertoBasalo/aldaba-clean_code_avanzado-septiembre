/* eslint-disable max-params */
export type LogCategory = "info" | "error" | "debug";
export type LogEntry = {
  category: LogCategory;
  message: string;
  timestamp: Date;
};
export class Logger {
  public log(entry: LogEntry) {
    console.log(JSON.stringify(entry));
  }
}
