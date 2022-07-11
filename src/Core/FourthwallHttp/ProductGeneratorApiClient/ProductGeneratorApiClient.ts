import { AxiosResponse } from "axios";
import { injectable } from "inversify";

import { ApiBase } from "../ApiBase/ApiBase";
import { GetProductGeneratorSuccessResponse } from "./mocks/GetProductGeneratorSuccessResponse";
import { ProductGenerator } from "./ProductGeneratorTypes";

@injectable()
export class ProductGeneratorApiClient extends ApiBase {
  getProductGenerator = async (
    productId: string
  ): Promise<AxiosResponse<ProductGenerator.RootObject>> => {
    console.log("ProductGeneratorApiClient:productId", productId);

    const response = {
      data: GetProductGeneratorSuccessResponse(),
      status: 200,
    } as any;

    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(response);
      }, 100);
    });
  };
}
