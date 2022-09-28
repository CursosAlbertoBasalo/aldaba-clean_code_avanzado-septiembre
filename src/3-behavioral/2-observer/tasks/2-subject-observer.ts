import { Agency, Booking } from "./agency";
import { AgencySubject } from "./agency-subject";
import { LoggerObserver } from "./logger.observer";

export class Client {
  private agency: Agency;
  private agencySubject: AgencySubject;

  constructor() {
    this.agency = new Agency();

    this.agencySubject = new AgencySubject(this.agency);
    const loggerObserver = new LoggerObserver();
    this.agencySubject.subscribe(loggerObserver);
  }
  public bookTrip(trip: string, price: number): Booking | undefined {
    return this.agencySubject.createBooking(trip, price);
  }
  public cancelBooking(booking: Booking): Booking | undefined {
    return this.agencySubject.cancelBooking(booking);
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
