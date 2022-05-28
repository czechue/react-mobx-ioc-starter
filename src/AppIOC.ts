import { BaseIOC } from "./BaseIOC";
import { HttpGateway } from "./Core/Http/DataGateway";
import { Types } from "./Core/Types";
import { RouterGateway } from "./Routing/RouterGateway";

export const container = new BaseIOC().build();

container.bind(Types.IHttpGateway).to(HttpGateway).inSingletonScope();
container.bind(Types.IRouterGateway).to(RouterGateway).inSingletonScope();
