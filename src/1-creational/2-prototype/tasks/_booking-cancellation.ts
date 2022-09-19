/* eslint-disable max-params */
type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "";

export class Booking {
  constructor(
    public id: string,
    public destination: string,
    public departureDate: Date,
    public price: number,
    public status: BookingStatus,
    public createdOn: Date | null = new Date(),
    public updatedOn: Date | null = null
  ) {}
}

export class App {
  public getBooking(): Booking {
    const bookingId = Math.random().toString();
    const booking = new Booking(bookingId, "London", new Date(), 100, "Pending");
    return booking;
  }

  public cancelBooking(booking: Booking): Booking {
    // 🤢 mutable data, lost control and history
    booking.status = "Cancelled";
    booking.updatedOn = new Date();
    return booking;
  }
}

const app = new App();
const booking = app.getBooking();
console.log("💚 Booking:", booking);
const cancelled = app.cancelBooking(booking);
console.log("🚫 Cancelled booking:", cancelled);
