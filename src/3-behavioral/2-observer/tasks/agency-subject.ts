import { Agency, Booking } from "./agency";
import { Observer } from "./logger.observer";

export interface Observable {
  subscribe(observer: Observer): void;
  notifyObservers(businessEvent: string, message: string): void;
}

/**
 * An Agency wrapper that implements the Observable interface.
 * Is a decorator that adds the subscribe and notifyObservers method to the Agency class.
 * @param {Agency} agency
 */
export class AgencySubject implements Observable {
  private observers: Observer[] = [];

  constructor(private agency: Agency) {}

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }
  public notifyObservers(businessEvent: string, message: string): void {
    this.observers.forEach(obs => obs.notify(businessEvent, message));
  }
  public createBooking(trip: string, price: number): Booking | undefined {
    try {
      const result = this.agency.createBooking(trip, price);
      this.notifyObservers("booking-created", JSON.stringify(result));
      return result;
    } catch (error) {
      this.notifyObservers("exception", (error as Error).message);
    }
  }
  public cancelBooking(booking: Booking): Booking | undefined {
    try {
      const result = this.agency.cancelBooking(booking);
      this.notifyObservers("booking-cancelled", JSON.stringify(result));
      return result;
    } catch (error) {
      this.notifyObservers("exception", (error as Error).message);
    }
  }
}
