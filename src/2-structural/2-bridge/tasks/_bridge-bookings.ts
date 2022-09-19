export class SpaceX {
  constructor() {
    console.log("Spacial flight operator SpaceX ready to work");
  }

  public getAvailableSeats(flightId: string): number {
    return 10;
  }
  public getPrice(flightId: string): number {
    return 100;
  }
  public createBooking(flightId: string, passengers: number): string {
    return `🚀 SpaceX Booking for ${flightId} with ${passengers} passengers`;
  }
}
// ToDo: there is another space operator called BlueOrigin

export class SpaceTravels {
  private readonly spaceX = new SpaceX();

  constructor() {
    console.log("Space tourism agency SpaceTravels ready to work");
  }

  public bookTrip(flightId: string, passengers: number): string {
    if (this.spaceX.getAvailableSeats(flightId) < passengers) {
      throw new Error("Not enough seats");
    }
    const amount = this.spaceX.getPrice(flightId) * passengers;
    this.makePayment(amount);
    return this.spaceX.createBooking(flightId, passengers);
  }
  private makePayment(amount: number): void {
    console.log("💸 Agency making payment :" + amount);
  }
}

// ToDo : also we want to work with another agency they have created called AstroidBookings
export class Client {
  private readonly spaceTravels = new SpaceTravels();
  public goToMars(): string {
    return this.spaceTravels.bookTrip("Mars", 2);
  }
}

const client = new Client();
console.log(client.goToMars());
