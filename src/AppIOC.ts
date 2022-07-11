import { BaseIOC } from "./BaseIOC";
import { ApiBase } from "./Core/FourthwallHttp/ApiBase/ApiBase";
import { CustomizationV2ApiClient } from "./Core/FourthwallHttp/CustomizationV2ApiClient/CustomizationV2ApiClient";
import { ProductGeneratorApiClient } from "./Core/FourthwallHttp/ProductGeneratorApiClient/ProductGeneratorApiClient";
import { HttpGateway } from "./Core/Http/HttpGateway";
import { Types } from "./Core/Types";
import { RouterGateway } from "./Routing/RouterGateway";

export const container = new BaseIOC().build();

container.bind(Types.IHttpGateway).to(HttpGateway).inSingletonScope();
container.bind(Types.IRouterGateway).to(RouterGateway).inSingletonScope();
container.bind(Types.IApiBase).to(ApiBase).inSingletonScope();
container
  .bind(Types.ICustomizationV2ApiModel)
  .to(CustomizationV2ApiClient)
  .inSingletonScope();
container
  .bind(Types.IProductGeneratorApiModel)
  .to(ProductGeneratorApiClient)
  .inSingletonScope();
