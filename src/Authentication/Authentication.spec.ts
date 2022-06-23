import { HttpGateway } from "../Core/Http/HttpGateway";
import { Types } from "../Core/Types";
import { Router } from "../Routing/Router";
import { RouterGateway } from "../Routing/RouterGateway";
import { RouterRepository } from "../Routing/RouterRepository";
import { AppTestHarness } from "../TestTools/AppHarness";
import { GetFailedRegistrationStub } from "../TestTools/GetFailedRegistrationStub";
import { GetFailedUserLoginStub } from "../TestTools/GetFailedUserLoginStub";
import { GetSuccessfulRegistrationStub } from "../TestTools/GetSuccessfulRegistrationStub";
import { GetSuccessfulUserLoginStub } from "../TestTools/GetSuccessfulUserLoginStub";
import { LoginRegisterPresenter } from "./LoginRegisterPresenter";
import { UserModel } from "./UserModel";

let appTestHarness: AppTestHarness;
let router: Router;
let routerRepository: RouterRepository;
let routerGateway: RouterGateway;
let dataGateway: HttpGateway;
let userModel: UserModel;
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
    userModel = appTestHarness.container.get(UserModel);
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
      it("should block wildcard *(default) routes when not logged in", async () => {
        await router.goToId("default", "");

        expect(routerGateway.goToId).toHaveBeenLastCalledWith("loginLink", "");
      });

      it("should block secure routes when not logged in", async () => {
        await router.goToId("homeLink", "");

        expect(routerGateway.goToId).toHaveBeenLastCalledWith("loginLink", "");
      });

      it("should allow public route when not logged in", async () => {
        await router.goToId("authorPolicyLink", "");

        expect(routerGateway.goToId).toHaveBeenLastCalledWith(
          "authorPolicyLink",
          ""
        );
      });
    });
  });

  describe("register", () => {
    beforeEach(() => {
      loginRegisterPresenter = appTestHarness.container.get(
        LoginRegisterPresenter
      );
    });

    it("should show successful user message on successful register", async () => {
      dataGateway.post = jest.fn().mockImplementation(() => {
        return Promise.resolve(GetSuccessfulRegistrationStub());
      });

      loginRegisterPresenter.email = "a@b.com";
      loginRegisterPresenter.password = "Test1234";

      await loginRegisterPresenter.register();

      expect(loginRegisterPresenter.showValidationWarning).toBe(false);
      expect(loginRegisterPresenter.messages).toEqual(["User registered"]);
    });

    it("should show failed server message on failed register", async () => {
      dataGateway.post = jest.fn().mockImplementation(() => {
        return Promise.resolve(GetFailedRegistrationStub());
      });

      loginRegisterPresenter.email = "a@b.com";
      loginRegisterPresenter.password = "Test1234";

      await loginRegisterPresenter.register();

      expect(loginRegisterPresenter.showValidationWarning).toBe(true);
      expect(loginRegisterPresenter.messages).toEqual([
        "Failed: credentials not valid must be (email and >3 chars on password).",
      ]);
    });
  });

  describe("login", () => {
    beforeEach(async () => {
      await router.goToId("loginLink");
      loginRegisterPresenter = appTestHarness.container.get(
        LoginRegisterPresenter
      );
    });

    it("should start at loginLink", async () => {
      expect(loginRegisterPresenter.option).toBe("login");
    });

    it("should go to homeLink on successful login (and populate userModel)", async () => {
      dataGateway.post = jest.fn().mockImplementation(() => {
        return Promise.resolve(GetSuccessfulUserLoginStub());
      });
      loginRegisterPresenter.email = "a@b.com";
      loginRegisterPresenter.password = "Test1234";

      await loginRegisterPresenter.login();

      expect(userModel.token).toBe("a@b1234.com");
      expect(routerGateway.goToId).toHaveBeenLastCalledWith("homeLink", "");
    });

    it("should update private route when successful login", async () => {
      dataGateway.post = jest.fn().mockImplementation(() => {
        return Promise.resolve(GetSuccessfulUserLoginStub());
      });
      loginRegisterPresenter.email = "a@b.com";
      loginRegisterPresenter.password = "Test1234";

      await loginRegisterPresenter.login();

      expect(router.currentRoute.routeId).toBe("homeLink");
    });

    it("should not update route when failed login", async () => {
      dataGateway.post = jest.fn().mockImplementation(() => {
        return Promise.resolve(GetFailedUserLoginStub());
      });

      loginRegisterPresenter.email = "a@b.com";
      loginRegisterPresenter.password = "Test1234";

      await loginRegisterPresenter.login();

      expect(router.currentRoute.routeId).toBe("loginLink");
    });

    it("should show failed user message on failed login", async () => {
      dataGateway.post = jest.fn().mockImplementation(() => {
        return Promise.resolve(GetFailedUserLoginStub());
      });

      loginRegisterPresenter.email = "a@bc.com";
      loginRegisterPresenter.password = "Test1234";

      await loginRegisterPresenter.login();

      expect(loginRegisterPresenter.showValidationWarning).toBe(true);
      expect(loginRegisterPresenter.messages).toEqual([
        "Failed: no user record.",
      ]);
    });

    // todo: ??
    it("should clear messages on route change", async () => {
      dataGateway.post = jest.fn().mockImplementation(() => {
        return Promise.resolve(GetSuccessfulUserLoginStub());
      });

      loginRegisterPresenter.email = "a@bc.com";
      loginRegisterPresenter.password = "Test1234";

      await loginRegisterPresenter.login();

      expect(loginRegisterPresenter.messages).toEqual(["User logged in"]);

      await router.goToId("logoutLink", "");
      expect(loginRegisterPresenter.messages).toEqual(["User logged in"]);
    });

    it("should logout", async () => {
      dataGateway.post = jest.fn().mockImplementation(() => {
        return Promise.resolve(GetSuccessfulUserLoginStub());
      });

      loginRegisterPresenter.email = "a@bc.com";
      loginRegisterPresenter.password = "Test1234";

      await loginRegisterPresenter.login();
      await loginRegisterPresenter.logOut();

      expect(userModel.token).toBe("");
    });
  });
});
