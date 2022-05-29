import "reflect-metadata";

import { Types } from "../Core/Types";
import { Router } from "../Routing/Router";

let appTestHarness = null;
let router = null;
let routerRepository = null;
let routerGateway = null;
let onRouteChange = null;

describe("init", () => {
  beforeEach(() => {
    appTestHarness = new AppTestHarness();
    appTestHarness.init();
    router = appTestHarness.container.get(Router);
    routerRepository = appTestHarness.container.get(RouterRepository);
    routerGateway = appTestHarness.container.get(Types.IRouterGateway);
    onRouteChange = () => {};
  });

  it("should be an null route", () => {
    expect(routerRepository.currentRoute.routeId).toBe(null);
  });

  describe("bootstrap", () => {
    beforeEach(() => {
      appTestHarness.bootStrap(onRouteChange);
    });

    it("should start at null route", () => {
      expect(routerRepository.currentRoute.routeId).toBe(null);
    });

    describe("routing", () => {
      it("should block wildcard *(default) routes when not logged in", () => {
        router.goToId("default");

        expect(routerGateway.goToId).toHaveBeenLastCalledWith("loginLink");
      });

      it("should block secure routes when not logged in", () => {
        router.goToId("homeLink");

        expect(routerGateway.goToId).toHaveBeenLastCalledWith("loginLink");
      });

      it("should allow public route when not logged in", () => {
        router.goToId("authorPolicyLink");

        expect(routerGateway.goToId).toHaveBeenLastCalledWith(
          "authorPolicyLink"
        );
      });
    });
  });
});
