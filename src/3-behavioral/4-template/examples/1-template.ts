export abstract class Template {
  public hook1(): void {} // could be overridden
  public abstract step1(): void; // must be implemented
  public hook2(payload = ""): void {
    console.log("✅ Done " + payload); // default if not overridden
  }
  public execute(): void {
    // execution order assured
    this.hook1();
    this.step1();
    this.hook2();
  }
}

export class ConcreteAlfa extends Template {
  public override hook1(): void {
    console.log("🅰️  Hook 1");
  }
  public step1(): void {
    console.log("🅰️  Step 1 SURROUNDED BY HOOKS");
  }
}

export class ConcreteBravo extends Template {
  // no hook 1

  public step1(): void {
    console.log("🅱️  Step 1 ALONE");
  }
  public override hook2(): void {} // no hook 2 also
}

export class ConcreteCharlie extends Template {
  public step1(): void {
    console.log("©️  Step 1 CUSTOMIZED");
  }
  public override hook2(): void {
    super.hook2("charlie");
  }
}

export class Client {
  private alfa = new ConcreteAlfa();
  private bravo = new ConcreteBravo();
  private charlie = new ConcreteCharlie();
  public run(): void {
    this.alfa.execute();
    this.bravo.execute();
    this.charlie.execute();
  }
}

const client = new Client();
client.run();
