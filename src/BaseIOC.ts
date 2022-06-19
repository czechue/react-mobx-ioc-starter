import "reflect-metadata";

import { Container } from "inversify";

import { Router } from "./Routing/Router";

export class BaseIOC {
  private container: Container;

  constructor() {
    this.container = new Container({
      autoBindInjectable: true,
      defaultScope: "Transient",
    });
  }

  public build(): Container {
    this.container.bind(Router).to(Router).inSingletonScope();
    return this.container;
  }
}
