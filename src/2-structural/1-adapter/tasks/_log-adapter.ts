import { Logger } from "./logger";

export class Client {
  private readonly logger!: Logger;
  constructor() {
    //this.logger = new Logger( x , new ConsoleWriter());
  }
  public doThings() {
    this.logger.log({
      category: "info",
      message: "Hello World",
      timestamp: new Date(),
    });
  }
}

const client = new Client();
client.doThings();
