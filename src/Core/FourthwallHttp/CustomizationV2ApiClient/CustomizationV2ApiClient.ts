import { AxiosResponse } from "axios";
import { injectable } from "inversify";

import { ApiBase } from "../ApiBase/ApiBase";
import type { paths } from "../schema";
import { GetCustomizationSuccessResponse } from "./mocks/GetCustomizationSuccessResponse";

export namespace CustomizationV2Api {
  export module getCustomization {
    export type Response = Omit<
      paths["/api/v2/customization/{customizationId}"]["get"]["responses"]["200"]["content"]["application/json"],
      "product"
    >;
    export type Params =
      paths["/api/v2/customization/{customizationId}"]["get"]["parameters"]["path"];
  }

  export module CreateOffer {
    export type Response =
      paths["/api/v2/customization/{customizationId}/create_offer"]["post"]["responses"]["201"]["content"]["application/json"];
    export type Params =
      paths["/api/v2/customization/{customizationId}/create_offer"]["post"]["parameters"]["path"];
    export type Body =
      paths["/api/v2/customization/{customizationId}/create_offer"]["post"]["requestBody"]["content"]["application/json"];
  }

  export module UpdateOffer {
    export type Response =
      paths["/api/v2/customization/{customizationId}/update_offer/{offerId}"]["post"]["responses"]["201"];
    export type Params =
      paths["/api/v2/customization/{customizationId}/update_offer/{offerId}"]["post"]["parameters"]["path"];
    export type Body =
      paths["/api/v2/customization/{customizationId}/update_offer/{offerId}"]["post"]["requestBody"]["content"]["application/json"];
  }
}

@injectable()
export class CustomizationV2ApiClient extends ApiBase {
  getCustomization = (
    customizationId: CustomizationV2Api.getCustomization.Params["customizationId"] = "1"
  ): Promise<AxiosResponse<CustomizationV2Api.getCustomization.Response>> => {
    //
    // return this.get<CustomizationV2Api.getCustomization.Response>(
    //   `/v2/customization/${customizationId}`
    // );

    const response = {
      data: GetCustomizationSuccessResponse(customizationId),
      status: 200,
    } as any;

    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(response);
      }, 100);
    });
  };

  createOffer = (
    customizationId: CustomizationV2Api.CreateOffer.Params["customizationId"],
    body: CustomizationV2Api.CreateOffer.Body
  ) => {
    return this.post<
      CustomizationV2Api.CreateOffer.Body,
      CustomizationV2Api.CreateOffer.Response
    >(`/v2/customization/${customizationId}/create_offer`, body);
  };

  updateOffer = (
    customizationId: CustomizationV2Api.UpdateOffer.Params["customizationId"],
    offerId: CustomizationV2Api.UpdateOffer.Params["offerId"],
    body: CustomizationV2Api.UpdateOffer.Body
  ) => {
    return this.post<
      CustomizationV2Api.UpdateOffer.Body,
      CustomizationV2Api.UpdateOffer.Response
    >(`/v2/customization/${customizationId}/update_offer/${offerId}`, body);
  };
}
