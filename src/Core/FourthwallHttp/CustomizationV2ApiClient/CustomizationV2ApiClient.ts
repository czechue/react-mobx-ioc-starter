import type { paths } from "../schema";
import { ApiBase } from "./ApiBase";

namespace CustomizationV2Api {
  export module getCustomization {
    export type Response =
      paths["/api/v2/customization/{customizationId}"]["get"]["responses"]["200"]["content"]["application/json"];
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

class CustomizationV2ApiModel extends ApiBase {
  getCustomization = (
    customizationId: CustomizationV2Api.getCustomization.Params["customizationId"]
  ) => {
    return this.get<CustomizationV2Api.getCustomization.Response>(
      `/v2/customization/${customizationId}`
    );
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

export const CustomizationV2ApiClient = new CustomizationV2ApiModel();
