// import { AppPresenter } from "../AppPresenter";
// import { LoginRegisterPresenter } from "../Authentication/LoginRegisterPresenter";
// import { BaseIOC } from "../BaseIOC";
// import { FakeHttpGateway } from "../Core/FakeHttpGateway";
// import { Types } from "../Core/Types";
// import { FakeRouterGateway } from "../Routing/FakeRouterGateway";
// import { Router } from "../Routing/Router";
// import { RouterRepository } from "../Routing/RouterRepository";
// import { SingleBooksResultStub } from "./SingleBooksResultStub";
//
// export class AppTestHarness {
//   container;
//
//   dataGateway;
//
//   loginRegisterPresenter;
//
//   routerPresenter;
//
//   router;
//
//   routerGateway;
//
//   // 1. set up the app
//   init() {
//     this.container = new BaseIOC().buildBaseTemplate();
//
//     this.container
//       .bind(Types.IDataGateway)
//       .to(FakeHttpGateway)
//       .inSingletonScope();
//     this.container
//       .bind(Types.IRouterGateway)
//       .to(FakeRouterGateway)
//       .inSingletonScope();
//
//     this.appPresenter = this.container.get(AppPresenter);
//     this.router = this.container.get(Router);
//     this.routerRepository = this.container.get(RouterRepository);
//     this.routerGateway = this.container.get(Types.IRouterGateway);
//
//     let self = this;
//
//     this.routerGateway.goToId = jest.fn().mockImplementation((routeId) => {
//       // pivot
//       self.router.updateCurrentRoute(routeId, null, null);
//     });
//   }
//
//   // 2. bootstrap the app
//   bootStrap(onRouteChange) {
//     this.appPresenter.load(onRouteChange);
//   }
//
//   // 3. login or register to the app
//   setupLogin = async (loginStub, type) => {
//     this.dataGateway = this.container.get(Types.IDataGateway);
//     this.dataGateway.get = jest.fn().mockImplementation((path) => {
//       return Promise.resolve(SingleBooksResultStub());
//     });
//     this.dataGateway.post = jest.fn().mockImplementation((path) => {
//       return Promise.resolve(loginStub());
//     });
//
//     this.loginRegisterPresenter = this.container.get(LoginRegisterPresenter);
//     this.loginRegisterPresenter.email = "a@b.com";
//     this.loginRegisterPresenter.password = "123";
//     await this.loginRegisterPresenter.login();
//     return this.loginRegisterPresenter;
//   };
// }
