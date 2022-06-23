import { HttpGateway } from "../Core/Http/HttpGateway";
import { Types } from "../Core/Types";
import { Router } from "../Routing/Router";
import { RouterGateway } from "../Routing/RouterGateway";
import { RouterRepository } from "../Routing/RouterRepository";
import { AppTestHarness } from "../TestTools/AppHarness";
import { GetSuccessfulRegistrationStub } from "../TestTools/GetSuccessfulRegistrationStub";
import { LoginRegisterPresenter } from "./LoginRegisterPresenter";
// import { UserModel } from "./UserModel";

let appTestHarness: AppTestHarness;
let router: Router;
let routerRepository: RouterRepository;
let routerGateway: RouterGateway;
let dataGateway: HttpGateway;
// let userModel: UserModel;
let onRouteChange = () => {};

let loginRegisterPresenter: LoginRegisterPresenter;

describe("init", () => {
  beforeEach(() => {
    appTestHarness = new AppTestHarness();
    appTestHarness.init();
    router = appTestHarness.container.get(Router);
    routerRepository = appTestHarness.container.get(RouterRepository);
    routerGateway = appTestHarness.container.get(Types.IRouterGateway);
    dataGateway = appTestHarness.container.get(Types.IHttpGateway);
    // userModel = appTestHarness.container.get(UserModel);
    onRouteChange = () => {};
  });

  it("should be an null route", () => {
    expect(routerRepository.currentRoute.routeId).toBe("");
  });

  describe("bootstrap", () => {
    beforeEach(() => {
      appTestHarness.bootStrap(onRouteChange);
    });

    it("should start at null route", () => {
      expect(routerRepository.currentRoute.routeId).toBe("");
    });

    describe("routing", () => {
      it("should block wildcard *(default) routes when not logged in", () => {
        router.goToId("default", "");

        expect(routerGateway.goToId).toHaveBeenLastCalledWith("loginLink", "");
      });

      it("should block secure routes when not logged in", () => {
        router.goToId("homeLink", "");

        expect(routerGateway.goToId).toHaveBeenLastCalledWith("loginLink", "");
      });

      it("should allow public route when not logged in", () => {
        router.goToId("authorPolicyLink", "");

        expect(routerGateway.goToId).toHaveBeenLastCalledWith(
          "authorPolicyLink",
          ""
        );
      });
    });
  });

  describe("register", () => {
    it("should show success", async () => {
      dataGateway.post = jest.fn().mockImplementation(() => {
        return Promise.resolve(GetSuccessfulRegistrationStub());
      });

      loginRegisterPresenter = appTestHarness.container.get(
        LoginRegisterPresenter
      );
      loginRegisterPresenter.email = "a@b.com";
      loginRegisterPresenter.password = "Test1234";

      await loginRegisterPresenter.register();

      expect(loginRegisterPresenter.showValidationWarning).toBe(false);
      expect(loginRegisterPresenter.messages).toEqual(["User registered"]);
    });
  });
});
