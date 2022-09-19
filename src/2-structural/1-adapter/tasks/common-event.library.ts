export type CommonEvent = {
  date: Date;
  host: string;
  device: string;
  severity: number;
  extension: string[];
};

// ToDo: an external library with proprietary format
export class CommonEventService {
  public createMessage(event: CommonEvent): string[] {
    const { date, host, device, severity, extension } = event;
    const timestamp = `${date.toLocaleDateString("en-us")} ${date.toLocaleTimeString("en-us")}`;
    const prefix = `${timestamp} ${host}`;
    const header = `CEF:0|${device}|${severity}|${extension.join(" ")}`;
    const eventMessage = [];
    eventMessage.push(prefix);
    eventMessage.push(header);
    return eventMessage;
  }
}
