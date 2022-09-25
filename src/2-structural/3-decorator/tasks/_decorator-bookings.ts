/* eslint-disable max-params */
type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "";
export class Booking {
  constructor(
    public id: number,
    public trip: string,
    public user: string,
    public price: number,
    public status: BookingStatus,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

export interface BookingCreator {
  createBooking(trip: string, price: number): Booking;
}

export class Agency implements BookingCreator {
  public createBooking(trip: string, price: number): Booking {
    const bookingId = Math.floor(Math.random() * 100);
    const user = "";
    return new Booking(bookingId, trip, user, price, "Pending", new Date(), new Date());
  }
}

export class Client {
  private bookingCreation: BookingCreator;

  constructor() {
    this.bookingCreation = new Agency();
  }

  public createBooking(trip: string, price: number): Booking {
    return this.bookingCreation.createBooking(trip, price);
  }
  public cancelBooking(booking: Booking): Booking {
    // Todo : add this new functionality
    return booking;
  }
}

const client = new Client();
const booking = client.createBooking("Paris", 100);
console.log("📅 booking created: ", booking);
const bookingCancelled = client.cancelBooking(booking);
console.log("❌ booking cancelled: ", bookingCancelled);
