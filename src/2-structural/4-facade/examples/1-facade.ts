import { Alpha, Bravo, Charlie } from "./0-no-facade";

export class Facade {
  // ! hide the internals
  private alpha = new Alpha();

  public doSomethingAlpha(param: string): string {
    const alphaResult = this.alpha.methodAlpha(param);
    return alphaResult;
  }
  // ! be as expressive as needed
  public doSomethingBravo(param: string): number {
    const alphaResult = this.alpha.methodAlpha(param);
    const bravo = new Bravo();
    const bravoResult = bravo.methodBravo(alphaResult.length);
    return bravoResult;
  }
  public doSomethingCharlie(param: string): string {
    const charlie = new Charlie();
    const charlieResult = charlie.methodCharlie(param);
    return charlieResult;
  }
}

export class Client {
  // ! only one dependency
  private facade = new Facade();
  public doSomethingAlpha(): string {
    return this.facade.doSomethingAlpha("1");
  }
  public doSomethingBravoCharlie(): string {
    // ! choose the abstraction level you want
    const bravoResult = this.facade.doSomethingBravo("1");
    const charlieResult = this.facade.doSomethingCharlie("1");
    return bravoResult + charlieResult;
  }
}

const client = new Client();
console.log("client", client.doSomethingAlpha());
console.log("client", client.doSomethingBravoCharlie());
