export interface Implementation {
  workHard(): string;
}

export class ImplementationWorker implements Implementation {
  public workHard(): string {
    return "👷🏼 Implementation working hard";
  }
}

export class ImplementationStudent implements Implementation {
  public workHard(): string {
    return "🧑🏼‍🎓 Implementation student studying hard";
  }
}

export interface Abstraction {
  doStuff(): string;
}

export class AbstractionManager implements Abstraction {
  constructor(private readonly implementation: Implementation) {}

  public doStuff(): string {
    console.log("👔 Abstraction doing things");
    const result = this.implementation.workHard();
    return "Managing " + result.toUpperCase();
  }
}

export class AbstractionTeacher implements Abstraction {
  constructor(private readonly implementation: Implementation) {}

  public doStuff(): string {
    console.log("🧑🏼‍🏫 Abstraction doing things");
    const result = this.implementation.workHard();
    return "Teaching " + result.toUpperCase();
  }
}

export class Client {
  private readonly abstraction1: Abstraction = new AbstractionManager(new ImplementationWorker());
  private readonly abstraction2: Abstraction = new AbstractionTeacher(new ImplementationStudent());

  public doStuff1(): string {
    return this.abstraction1.doStuff();
  }
  public doStuff2(): string {
    return this.abstraction2.doStuff();
  }
}

const client = new Client();
console.log(client.doStuff1());
console.log(client.doStuff2());
