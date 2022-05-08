import "reflect-metadata";

import { Container } from "inversify";

import { HttpGateway } from "../http/DataGateway";
import { Router } from "../routing/Router";
import { RouterGateway } from "../routing/RouterGateway";
import { RoutingState } from "../routing/RoutingState";
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
