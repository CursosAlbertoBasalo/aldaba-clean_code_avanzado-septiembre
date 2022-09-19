import { Alpha, Bravo, Charlie } from "./0-no-facade";

export class Facade {
  public doSomethingBravo(param: string): number {
    const alpha = new Alpha();
    const alphaResult = alpha.methodAlpha(param);
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
  public doSomething(): string {
    const facade = new Facade();
    const bravoResult = facade.doSomethingBravo("1");
    const charlieResult = facade.doSomethingCharlie("1");
    return bravoResult + charlieResult;
  }
}

const client = new Client();
console.log("client", client.doSomething());
