import { Agency } from "./agency";
import { Observer } from "./logger.observer";

export interface Observable {
  subscribe(observer: Observer): void;
  notifyObservers(businessEvent: string, message: string): void;
}

export class AgencySubject implements Observable {
  constructor(private agency: Agency) {}
  subscribe(observer: Observer): void {
    throw new Error("Method not implemented.");
  }
  notifyObservers(businessEvent: string, message: string): void {
    throw new Error("Method not implemented.");
  }
}
