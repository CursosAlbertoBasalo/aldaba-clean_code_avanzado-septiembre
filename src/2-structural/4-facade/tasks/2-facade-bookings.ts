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

export class AgencyFacade {
  // ! one class to rule them all
  private bookings: Bookings = new Bookings();
  private payments: Payments = new Payments();
  private notifier: Notifier = new Notifier();

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

export class Client {
  // ! only one dependency
  private agency: AgencyFacade = new AgencyFacade();

  // ! maximum abstraction level, not always possible
  public createBooking(trip: string): string {
    return this.agency.createBooking(trip);
  }
  public cancelBooking(trip: string): string {
    return this.agency.cancelBooking(trip);
  }
}
const client = new Client();
console.log(client.createBooking("Paris"));
console.log(client.cancelBooking("Paris"));
