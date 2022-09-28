export interface Observable {
  subscribe(observer: Observer): void;
  unSubscribe(observer: Observer): void;
  notifyObservers(message: string): void;
}

export interface Observer {
  notify(message: string): void;
}

// aka publisher
export class Subject implements Observable {
  private observers: Observer[] = [];

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }
  public unSubscribe(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  public notifyObservers(message: string): void {
    this.observers.forEach(obs => obs.notify(message));
  }
}

// aka subscriber
export class ConcreteObserverA implements Observer {
  public notify(message: string): void {
    console.log(`${message} 📩 received by 🅰️`);
  }
}

export class ConcreteObserverB implements Observer {
  public notify(message: string): void {
    console.log(`${message} 📩 received by 🅱️`);
  }
}

export class Client {
  private subject: Subject = new Subject();
  private observerA: ConcreteObserverA = new ConcreteObserverA();
  private observerB: ConcreteObserverB = new ConcreteObserverB();

  public subscribeA(): void {
    this.subject.subscribe(this.observerA);
  }
  public subscribeB(): void {
    this.subject.subscribe(this.observerB);
  }
  public sendMessage(message: string): void {
    this.subject.notifyObservers(message);
  }
}

const client = new Client();
client.subscribeA();
client.sendMessage("Hello 👋🏼");
client.subscribeB();
client.sendMessage("Regards 🙋🏼");
