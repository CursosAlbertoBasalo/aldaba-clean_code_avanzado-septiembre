export class Payments {
  public makePayment(issue: string, amount: number): string {
    return `${issue} ${amount} payed`;
  }
  public makeRefund(issue: string, amount: number): string {
    return `${issue} ${amount} refunded`;
  }
}

export class Bookings {
  public getPrice(trip: string): number {
    return 100;
  }
  public makeBooking(trip: string, payment: string): string {
    return `${trip} with ${payment} booked`;
  }
  public cancelBooking(trip: string, payment: string): string {
    return `${trip} with ${payment} canceled`;
  }
}

export class Notifier {
  public notify(trip: string, operation: string): string {
    return `${trip} ${operation} notified to passenger`;
  }
}

export class Client {
  // ToDo: depends on three classes...
  private bookings: Bookings = new Bookings();
  private payments: Payments = new Payments();
  private notifier: Notifier = new Notifier();

  // ToDo: reduce internal know how
  public createBooking(trip: string): string {
    const tripPrice = this.bookings.getPrice(trip);
    const paymentsResult = this.payments.makePayment(trip, tripPrice);
    const bookingsResult = this.bookings.makeBooking(trip, paymentsResult);
    const notifierResult = this.notifier.notify(trip, "booked");
    return `💸 ${paymentsResult} +  📅 ${bookingsResult} + 📧 ${notifierResult}`;
  }
  public cancelBooking(trip: string): string {
    const tripPrice = this.bookings.getPrice(trip);
    const paymentsResult = this.payments.makeRefund(trip, tripPrice);
    const bookingsResult = this.bookings.cancelBooking(trip, paymentsResult);
    const notifierResult = this.notifier.notify(trip, "canceled");
    return `💸 ${paymentsResult} +  📅 ${bookingsResult} + 📧 ${notifierResult}`;
  }
}

const client = new Client();
console.log(client.createBooking("Paris"));
console.log(client.cancelBooking("Paris"));
