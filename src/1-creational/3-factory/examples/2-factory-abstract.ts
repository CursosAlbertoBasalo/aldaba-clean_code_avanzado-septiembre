export interface Something {
  someProperty: string;
  someMethod(x: string): string;
}

export interface Anything {
  anythingProperty: string;
  anythingMethod(x: string): string;
}

class ConcreteSomethingA implements Something {
  public someProperty = "🟩 A";
  public someMethod(param: string): string {
    return param.toUpperCase();
  }
}

class ConcreteSomethingB implements Something {
  public someProperty = "🟦 B";
  public someMethod(param: string): string {
    return param;
  }
}

class ConcreteAnythingA implements Anything {
  public anythingProperty = "🟢 A";
  public anythingMethod(param: string): string {
    return param;
  }
}

class ConcreteAnythingB implements Anything {
  public anythingProperty = "🔵 B";
  public anythingMethod(param: string): string {
    return param.toLocaleLowerCase();
  }
}

class SomethingFactory {
  public create(type: string): Something {
    if (type === "A") {
      return new ConcreteSomethingA();
    } else {
      return new ConcreteSomethingB();
    }
  }
}

class AnythingFactory {
  public create(type: string): Anything {
    if (type === "A") {
      return new ConcreteAnythingA();
    } else {
      return new ConcreteAnythingB();
    }
  }
}

class Factory {
  // ! A Factory of Factories
  public create(type: string, subType: string): Something | Anything {
    if (type === "Something") {
      return new SomethingFactory().create(subType);
    } else {
      return new AnythingFactory().create(subType);
    }
  }
}

class Client {
  public doStuff(): void {
    const factory = new Factory();

    const instanceA = factory.create("Something", "A") as Something;
    console.log("🅰️ Some property", instanceA.someProperty);
    console.log("🅰️ Some method", instanceA.someMethod("Hello"));
    const instanceB = factory.create("Anything", "B") as Anything;
    console.log("🅱️ Any property", instanceB.anythingProperty);
    console.log("🅱️ Any method", instanceB.anythingMethod("Goodbye"));
  }
}
new Client().doStuff();
