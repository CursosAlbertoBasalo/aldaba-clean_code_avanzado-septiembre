export interface Prototype<T> {
  clone(): T;
}

export type Primitive = string | number | boolean;

export class Product implements Prototype<Product> {
  public id = Math.random().toString();
  public timestamp = new Date().getTime();
  public name = "";
  public primitiveProperty: Primitive | null = null;
  public objectProperty: object | null = null;
  public arrayProperty: unknown[] = [];

  public clone(): Product {
    const serialization = JSON.stringify(this);
    const clone = JSON.parse(serialization);
    clone.id = Math.random().toString();
    clone.timestamp = new Date().getTime();
    return clone;
  }
}

export class Client {
  public static main(): void {
    const product1 = Client.createProduct1();
    console.log("☀️ Before clone");
    console.log(product1);
    const product2 = Client.createProduct2(product1);
    console.log("🌙 After clone");
    console.log(product1);
    console.log(product2);
  }

  private static createProduct1() {
    const product = new Product();
    product.name = "Product 1";
    product.primitiveProperty = "Primitive property";
    product.objectProperty = {
      key1: "value 1",
      key2: "value 2",
    };
    product.arrayProperty = ["Array property 1", "Array property 2"];
    return product;
  }

  private static createProduct2(productPrototype: Product) {
    const product2 = productPrototype.clone();
    product2.name = "Product 2";
    product2.primitiveProperty = "Primitive property 2";
    if (product2.objectProperty) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (product2.objectProperty as any).key1 = "value 1 2";
    }
    product2.arrayProperty[0] = "Array property 1 2";
    product2.arrayProperty.push("Array property 3");
    return product2;
  }
}

Client.main();
