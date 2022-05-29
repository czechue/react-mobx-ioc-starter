import "reflect-metadata";

import { Container } from "inversify";

import { Router } from "./Routing/Router";
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
