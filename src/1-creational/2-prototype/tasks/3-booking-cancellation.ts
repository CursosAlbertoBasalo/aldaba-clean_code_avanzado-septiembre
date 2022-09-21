/* eslint-disable max-params */
type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "";

interface Prototype<T> {
  clone(mutations?: Partial<T>): T;
}

export class Booking implements Prototype<Booking> {
  // ! readonly properties makes object immutable
  constructor(
    public readonly id: string,
    public readonly destination: string,
    public readonly departureDate: Date,
    public readonly price: number,
    public readonly status: BookingStatus,
    public readonly createdOn: Date | null = new Date(),
    public readonly updatedOn: Date | null = null
  ) {}

  public clone(mutations: Partial<Booking>) {
    // ! creates a new one copy (clone) with some changes (mutations)
    const clone = new Booking(
      mutations.id || this.id,
      mutations.destination || this.destination,
      mutations.departureDate || this.departureDate,
      mutations.price || this.price,
      mutations.status || this.status,
      mutations.createdOn || this.createdOn,
      new Date()
    );
    return clone;
  }

  public cancel(): Booking {
    // ! creates a new one copy (clone) with predefined logic changes (mutations)
    // const cancelledBooking = new Booking(
    //   this.id,
    //   this.destination,
    //   this.departureDate,
    //   this.price,
    //   "Cancelled",
    //   this.createdOn,
    //   new Date()
    // );
    const cancelledBooking = this.clone({ status: "Cancelled" });
    return cancelledBooking;
  }
}

export class App {
  public getBooking(): Booking {
    const bookingId = Math.random().toString();
    const booking = new Booking(bookingId, "London", new Date(), 100, "Pending");
    return booking;
  }

  public cancelBookingClone(booking: Booking): Booking {
    // ! Send mutations
    const cancelled = booking.clone({ status: "Cancelled" });
    // ! original record is preserved; operation can be undone and tracked
    return cancelled;
  }

  public cancelBooking(booking: Booking): Booking {
    // ! expect mutations inside
    const cancelled = booking.cancel();
    // ! original record is preserved; operation can be undone and tracked
    return cancelled;
  }
}

const app = new App();
const booking = app.getBooking();
console.log("💚 Booking:", booking);
const cancelledMutation = app.cancelBookingClone(booking);
console.log("🚫 Cancelled booking:", cancelledMutation);
const cancelledLogic = app.cancelBooking(booking);
console.log("🚫 Cancelled booking:", cancelledLogic);
