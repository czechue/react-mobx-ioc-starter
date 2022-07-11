import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";

import {
  CustomizationV2Api,
  CustomizationV2ApiClient,
} from "../../Core/FourthwallHttp/CustomizationV2ApiClient/CustomizationV2ApiClient";
import { Types } from "../../Core/Types";
import { RouterRepository } from "../../Routing/RouterRepository";
import { ProductGeneratorRepository } from "./ProductGeneratorRepository";

type CustomizationDm = CustomizationV2Api.getCustomization.Response;

@injectable()
export class CustomizationRepository {
  @inject(Types.ICustomizationV2ApiModel)
  customizationGateway!: CustomizationV2ApiClient;

  @inject(ProductGeneratorRepository)
  productGeneratorRepository!: ProductGeneratorRepository;

  @inject(Types.IRouterGateway)
  routerRepository!: RouterRepository;

  customizationDm!: CustomizationDm;

  constructor() {
    makeObservable(this, {
      customizationDm: observable,
    });
  }

  load = async (customizationId: string) => {
    const customizationDto = await this.customizationGateway.getCustomization(
      customizationId
    );
    // todo: rework to have productId in customization response (for now using customization for testing purpouse)
    const productId = customizationDto.data.customizationId;
    await this.productGeneratorRepository.load(productId);

    this.customizationDm = customizationDto.data;
  };
}
