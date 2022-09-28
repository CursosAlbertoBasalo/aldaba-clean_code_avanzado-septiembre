import { Agency, Booking } from "./agency";
import { Logger } from "./logger";

// ToDo : use a subject-observer pair to avoid use logger directly

export class Client {
  private agency: Agency;
  private logger: Logger = new Logger();

  constructor() {
    this.agency = new Agency();
  }
  public bookTrip(trip: string, price: number): Booking | undefined {
    try {
      const result = this.agency.createBooking(trip, price);
      this.logger.log({
        category: "info",
        message: "booking-created" + " - " + JSON.stringify(result),
        timestamp: new Date(),
      });
      return result;
    } catch (error) {
      this.logger.log({
        category: "error",
        message: "exception" + " - " + (error as Error).message,
        timestamp: new Date(),
      });
    }
  }
  public cancelBooking(booking: Booking): Booking | undefined {
    try {
      const result = this.agency.cancelBooking(booking);
      this.logger.log({
        category: "info",
        message: "booking-cancelled" + " - " + JSON.stringify(result),
        timestamp: new Date(),
      });
      return result;
    } catch (error) {
      this.logger.log({
        category: "error",
        message: "exception" + " - " + (error as Error).message,
        timestamp: new Date(),
      });
    }
  }
}

const client = new Client();
const booking = client.bookTrip("Paris", 100);
if (booking) {
  client.cancelBooking(booking);
}
const badBooking = client.bookTrip("Paris", -1); // throws error
if (badBooking) {
  client.cancelBooking(badBooking);
}
