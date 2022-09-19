export class ImplementationWorker {
  public workHard(): string {
    return "👷🏼 Implementation working hard";
  }
}

export class AbstractionManager {
  private readonly implementation = new ImplementationWorker();

  public doStuff(): string {
    console.log("👔 Abstraction doing things");
    const result = this.implementation.workHard();
    return "Managing " + result.toUpperCase();
  }
}

export class Client {
  private readonly abstraction = new AbstractionManager();

  public doStuff(): string {
    return this.abstraction.doStuff();
  }
}

const client = new Client();
console.log(client.doStuff());
