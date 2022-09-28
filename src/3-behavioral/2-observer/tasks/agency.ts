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

export class Agency {
  public createBooking(trip: string, price: number): Booking {
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }
    const bookingId = Math.floor(Math.random() * 100);
    const user = "";
    return new Booking(bookingId, trip, user, price, "Pending", new Date(), new Date());
  }

  public cancelBooking(booking: Booking): Booking {
    if (new Date().getFullYear() - booking.createdAt.getFullYear() > 1) {
      throw new Error("The booking is too old to be canceled");
    }
    return new Booking(
      booking.id,
      booking.trip,
      booking.user,
      booking.price,
      "Cancelled",
      booking.createdAt,
      new Date()
    );
  }
}
