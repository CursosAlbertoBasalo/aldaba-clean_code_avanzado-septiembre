export class Singleton {
  private static instance: Singleton;
  public readonly timestamp: number = Date.now();

  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

class ClientA {
  public static main(): void {
    const instance = Singleton.getInstance();
    console.log(instance.timestamp);
  }
}

ClientA.main();

class ClientB {
  public doStuff(): void {
    const instance = new Singleton();
    console.log(instance.timestamp);
    const instance2 = Singleton.getInstance();
    console.log(instance2.timestamp);
  }
}
new ClientB().doStuff();
new ClientB().doStuff();
