import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";

import { ProductGeneratorApiClient } from "../../Core/FourthwallHttp/ProductGeneratorApiClient/ProductGeneratorApiClient";
import { ProductGenerator } from "../../Core/FourthwallHttp/ProductGeneratorApiClient/ProductGeneratorTypes";

type GeneratorDm = ProductGenerator.RootObject;

@injectable()
export class ProductGeneratorRepository {
  productGeneratorDm!: GeneratorDm;

  @inject(ProductGeneratorApiClient)
  productGeneratorClient!: ProductGeneratorApiClient;

  constructor() {
    makeObservable(this, {
      productGeneratorDm: observable,
    });
  }

  load = async (productId: string) => {
    const productGeneratorDto =
      await this.productGeneratorClient.getProductGenerator(productId);
    console.log("111", productGeneratorDto.data);
    this.productGeneratorDm = productGeneratorDto.data;
  };
}
