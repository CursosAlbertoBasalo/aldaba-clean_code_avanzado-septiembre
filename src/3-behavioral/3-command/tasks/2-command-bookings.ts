import { Command, Invoker } from "./invoker";
import { Agency, Booking } from "./receiver";

export class BookingTripCommand implements Command {
  private receiver = new Agency();
  public execute(payload: string): string {
    console.log(`🛩️ Booking trip: ${payload}`);
    const result = this.receiver.createBooking(payload);
    return JSON.stringify(result);
  }
}

export class CancelTripCommand implements Command {
  private receiver = new Agency();
  public execute(payload: string): string {
    const parsedPayload = JSON.parse(payload);
    const booking = parsedPayload as Booking;
    if (booking) {
      console.log(`😭 Cancelling trip: ${payload}`);
      const result = this.receiver.cancelBooking(booking);
      return JSON.stringify(result);
    } else {
      throw new Error("Invalid payload");
    }
  }
}

export class Client {
  public static main() {
    const invoker = Client.buildInvoker();
    const booking = invoker.dispatch("booking", "The Moon");
    invoker.dispatch("cancel", booking);
    invoker.undo(); // alternate way if available
    invoker.dispatch("booking", "Mars");
    invoker.printHistory();
    Client.doMore(invoker);
  }

  private static buildInvoker(): Invoker {
    const invoker = new Invoker();
    invoker.register("booking", new BookingTripCommand());
    invoker.register("cancel", new CancelTripCommand());
    return invoker;
  }

  private static doMore(invoker: Invoker) {
    invoker.undo();
    invoker.printHistory();
    invoker.redo();
    invoker.printHistory();
  }
}

Client.main();
