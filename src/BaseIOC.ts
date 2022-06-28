import "reflect-metadata";

import { Container } from "inversify";

import { UserModel } from "./Authentication/UserModel";
import { AuthorsRepository } from "./Authors/AuthorsRepository";
import { BooksRepository } from "./Books/BooksRepository";
import { MessagesRepository } from "./Core/Messages/MessagesRepository";
import { NavigationRepository } from "./Navigation/NavigationRepository";
import { RouterRepository } from "./Routing/RouterRepository";

export class BaseIOC {
  private readonly container: Container;

  constructor() {
    this.container = new Container({
      autoBindInjectable: true,
      defaultScope: "Transient",
    });
  }

  public build(): Container {
    this.container
      .bind(MessagesRepository)
      .to(MessagesRepository)
      .inSingletonScope();
    this.container
      .bind(RouterRepository)
      .to(RouterRepository)
      .inSingletonScope();
    this.container
      .bind(NavigationRepository)
      .to(NavigationRepository)
      .inSingletonScope();
    this.container.bind(UserModel).to(UserModel).inSingletonScope();
    this.container.bind(BooksRepository).to(BooksRepository).inSingletonScope();
    this.container
      .bind(AuthorsRepository)
      .to(AuthorsRepository)
      .inSingletonScope();
    return this.container;
  }
}
