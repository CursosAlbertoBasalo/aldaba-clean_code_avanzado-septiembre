type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "";
export class Booking {
  // eslint-disable-next-line max-params
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
  public createBooking(trip: string): Booking {
    const bookingId = Math.floor(Math.random() * 100);
    const user = "";
    const price = Math.floor(Math.random() * 100);
    return new Booking(bookingId, trip, user, price, "Pending", new Date(), new Date());
  }
  public cancelBooking(booking: Booking): Booking {
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
