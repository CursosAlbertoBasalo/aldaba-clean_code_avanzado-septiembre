export type Primitive = string | number | boolean;

export class Product {
  public id = "";
  public timestamp = 0;
  public name = "";
  public primitiveProperty: Primitive | null = null;
  public objectProperty: object | null = null;
  public arrayProperty: unknown[] = [];
}

export interface BuildProduct {
  setName(name: string): BuildProduct;
  setPrimitiveProperty(primitive: Primitive): BuildProduct;
  setObjectProperty(object: object): BuildProduct;
  addArrayProperty(item: unknown): BuildProduct;
  build(): Product;
}

class ProductBuilder implements BuildProduct {
  private product: Product = new Product();

  public setName(name: string): BuildProduct {
    this.product.name = name;
    this.product.id = name.toLocaleLowerCase().replace(/\s/g, "-");
    return this;
  }

  public setPrimitiveProperty(primitive: Primitive): BuildProduct {
    this.product.primitiveProperty = primitive;
    return this;
  }

  public setObjectProperty(object: object): BuildProduct {
    this.product.objectProperty = object;
    return this;
  }

  public addArrayProperty(item: unknown): BuildProduct {
    this.product.arrayProperty = this.product.arrayProperty || [];
    this.product.arrayProperty.push(item);
    return this;
  }

  public build(): Product {
    this.product.timestamp = new Date().getTime();
    return this.product;
  }
}
class Client {
  private product: Product | null = null;
  public buildProduct(productNumber: number): Product {
    if (productNumber == 1) {
      this.product = new ProductBuilder()
        .setName("Product 1")
        .setPrimitiveProperty("Primitive property")
        .setObjectProperty({ key1: "value 1", key2: "value 2" })
        .addArrayProperty("Array property 1")
        .addArrayProperty("Array property 2")
        .build();
    } else {
      this.product = new ProductBuilder()
        .setName("Product 2")
        .setPrimitiveProperty("Primitive property")
        .setObjectProperty({ key1: "value 1", key2: "value 2" })
        .addArrayProperty("Array property 1")
        .build();
    }
    return this.product;
  }
}
const client = new Client();
const builderProduct1 = client.buildProduct(1);
console.log("👷🏼 Builder 1", builderProduct1);
const builderProduct2 = client.buildProduct(2);
console.log("👷🏼 Builder 2", builderProduct2);
