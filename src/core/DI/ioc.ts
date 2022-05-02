import "reflect-metadata";

import { Container } from "inversify";

import { HttpGateway } from "../Http/DataGateway";
import { Router } from "../Routing/Router";
import { RouterGateway } from "../Routing/RouterGateway";
import { RoutingState } from "../Routing/RoutingState";
import { Types } from "../Types";

export class BaseIOC {
  private container: Container;

  constructor() {
    this.container = new Container({
      autoBindInjectable: true,
      defaultScope: "Transient",
    });
  }

  public build(): Container {
    this.container.bind(RoutingState).to(RoutingState).inSingletonScope();
    this.container.bind(Router).to(Router).inSingletonScope();
    return this.container;
  }
}

export const container = new BaseIOC().build();

container.bind(Types.IHttpGateway).to(HttpGateway);
container.bind(Types.IRouterGateway).to(RouterGateway).inSingletonScope();
