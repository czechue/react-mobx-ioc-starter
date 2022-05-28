import "reflect-metadata";

import { Container } from "inversify";

import { HttpGateway } from "./Core/Http/DataGateway";
import { Types } from "./Core/Types";
import { createInjection } from "./libs/react-di";
import { Router } from "./Routing/Router";
import { RouterGateway } from "./Routing/RouterGateway";
import { RoutingState } from "./Routing/RoutingState";

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
