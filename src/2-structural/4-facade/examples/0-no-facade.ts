export class Alpha {
  public propertyAlpha = "🅰️";
  public methodAlpha(param: string): string {
    console.log(`${this.propertyAlpha} ${param}`);
    return this.propertyAlpha + param;
  }
}

export class Bravo {
  public propertyBravo = "🅱️";
  public methodBravo(param: number): number {
    console.log(`${this.propertyBravo} ${param}`);
    return this.propertyBravo.length + param;
  }
}

export class Charlie {
  public propertyCharlie = 0;
  public methodCharlie(param: string): string {
    console.log(`${this.propertyCharlie} ${param}`);
    return param + this.propertyCharlie.toString();
  }
}

// ToDo: improve this example with more methods on client, and maybe even some private ones

export class Client {
  public doSomething(): string {
    const alpha = new Alpha();
    const alphaResult = alpha.methodAlpha("1");
    const bravo = new Bravo();
    const bravoResult = bravo.methodBravo(alphaResult.length);
    const charlie = new Charlie();
    const charlieResult = charlie.methodCharlie("1");
    return bravoResult + charlieResult;
  }
}

const client = new Client();
console.log("client", client.doSomething());
