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
  private _product: Product | null = null;
  private get product() {
    if (!this._product) {
      this._product = new Product(); // singleton per builder process
    }
    return this._product;
  }

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
    const product = JSON.parse(JSON.stringify(this.product)); // clone
    this._product = null; // reset
    return product;
  }
}

class Client {
  private director = new Director();
  private product: Product | null = null;
  public buildUsingDirector(productNumber: number): Product {
    if (productNumber == 1) {
      this.product = this.director.buildProduct1With2Items();
    } else {
      this.product = this.director.buildProduct2With1Item();
    }
    return this.product;
  }
}

class Director {
  private builder = new ProductBuilder(); // same builder for both products
  public buildProduct1With2Items(): Product {
    const product = this.builder
      .setName("Product 1")
      .setPrimitiveProperty("Primitive property")
      .setObjectProperty({ key1: "value 1", key2: "value 2" })
      .addArrayProperty("Array property 1")
      .addArrayProperty("Array property 2")
      .build();
    return product;
  }
  public buildProduct2With1Item(): Product {
    const product = this.builder
      .setName("Product 2")
      .setPrimitiveProperty("Primitive property")
      .setObjectProperty({ key1: "value 1", key2: "value 2" })
      .addArrayProperty("Array property 1")
      .build();
    return product;
  }
}

const client = new Client();

const directorProduct1 = client.buildUsingDirector(1);
console.log("👔 Director 1", directorProduct1);
const directorProduct2 = client.buildUsingDirector(2);
console.log("👔 Director 2", directorProduct2);
