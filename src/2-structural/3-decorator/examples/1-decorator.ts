interface IComponent {
  property: string;
  method(param: string): string;
}

class Component implements IComponent {
  public property = "";
  public method(param: string): string {
    return param;
  }
}

class Decorator implements IComponent {
  private component: IComponent;
  constructor(component: IComponent) {
    this.component = component;
  }
  public get property(): string {
    return this.component.property;
  }
  public set property(value: string) {
    // ! change internal behavior
    this.component.property = this.replaceSpacesWithUnderscores(value);
  }
  public method(param: string): string {
    // ! change internal behavior
    return this.component.method(param).toUpperCase();
  }
  public moreFeatures: string[] = [];

  private replaceSpacesWithUnderscores(param: string): string {
    return param.replace(" ", "_");
  }
}

export class Client {
  public doThings(): string {
    const component = new Component();
    component.property = "hello world";
    return component.method(component.property);
  }
  public doOtherThings() {
    const decorator = new Decorator(new Component());
    // ! same external behavior...
    decorator.property = "good bye";
    // ! ... or even more
    decorator.moreFeatures.push("Extended without change");
    return decorator.method(decorator.property);
  }
}

const client = new Client();
console.log("🧑🏼‍🏭 component", client.doThings());
console.log("🧑🏼‍🎨 decorator", client.doOtherThings());
