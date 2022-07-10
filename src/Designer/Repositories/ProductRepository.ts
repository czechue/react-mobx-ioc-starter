import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";

import { HttpGateway } from "../../Core/Http/HttpGateway";
import { Types } from "../../Core/Types";

type ProductDm = any;

@injectable()
export class ProductRepository {
  productUrl = "/product";

  @inject(Types.IHttpGateway)
  dataGateway!: HttpGateway;

  productDm: ProductDm;

  constructor() {
    makeObservable(this, {
      productDm: observable,
    });
  }
}
