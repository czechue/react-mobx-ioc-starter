import { Container } from "inversify";

import { AppPresenter } from "../AppPresenter";
import { LoginRegisterPresenter } from "../Authentication/LoginRegisterPresenter";
import { UserModel } from "../Authentication/UserModel";
import { BaseIOC } from "../BaseIOC";
import { FakeHttpGateway } from "../Core/Http/FakeHttpGateway";
import { HttpGateway } from "../Core/Http/HttpGateway";
import { Types } from "../Core/Types";
import { FakeRouterGateway } from "../Routing/FakeRouterGateway";
import { Router } from "../Routing/Router";
import { RouterGateway } from "../Routing/RouterGateway";
import { RouterRepository } from "../Routing/RouterRepository";
import { SingleBooksResultStub } from "./SingleBooksResultStub";

export class AppTestHarness {
  container!: Container;
  dataGateway!: HttpGateway;
  loginRegisterPresenter!: LoginRegisterPresenter;
  router!: Router;
  routerGateway!: RouterGateway;
  routerRepository!: RouterRepository;
  userModel!: UserModel;

  appPresenter!: AppPresenter;

  // 1. set up the app
  init() {
    this.container = new BaseIOC().build();

    this.container
      .bind(Types.IHttpGateway)
      .to(FakeHttpGateway)
      .inSingletonScope();
    this.container
      .bind(Types.IRouterGateway)
      .to(FakeRouterGateway)
      .inSingletonScope();

    this.router = this.container.get(Router);
    this.routerRepository = this.container.get(RouterRepository);
    this.routerGateway = this.container.get(Types.IRouterGateway);

    this.appPresenter = this.container.get(AppPresenter);
    this.userModel = this.container.get(UserModel);

    let self = this;

    this.routerGateway.goToId = jest.fn().mockImplementation((routeId) => {
      // pivot
      self.router.updateCurrentRoute(routeId, "", "");
    });
  }

  // 2. bootstrap the app
  bootStrap(onRouteChange: any) {
    this.appPresenter.load(onRouteChange);
  }

  // 3. login or register to the app
  setupLogin = async (loginStub: any) => {
    this.dataGateway = this.container.get(Types.IHttpGateway);
    /* eslint-disable */
    this.dataGateway.get = jest.fn().mockImplementation((path: string) => {
      return Promise.resolve(SingleBooksResultStub());
    });
    /* eslint-disable */
    this.dataGateway.post = jest.fn().mockImplementation((path: string) => {
      return Promise.resolve(loginStub());
    });

    this.loginRegisterPresenter = this.container.get(LoginRegisterPresenter);
    this.loginRegisterPresenter.email = "a@b.com";
    this.loginRegisterPresenter.password = "123";
    await this.loginRegisterPresenter.login();
    return this.loginRegisterPresenter;
  };
}
