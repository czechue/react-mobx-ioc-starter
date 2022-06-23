import { Router } from "../Routing/Router";
import { AppTestHarness } from "../TestTools/AppHarness";
import { GetSuccessfulRegistrationStub } from "../TestTools/GetSuccessfulRegistrationStub";
import { NavigationPresenter } from "./NavigationPresenter";

let appTestHarness: AppTestHarness;
let navigationPresenter: NavigationPresenter;
let router: Router;

describe("navigation", () => {
  beforeEach(async () => {
    appTestHarness = new AppTestHarness();
    appTestHarness.init();
    appTestHarness.bootStrap(() => {});
    navigationPresenter = appTestHarness.container.get(NavigationPresenter);
    router = appTestHarness.container.get(Router);
  });

  describe("before login", () => {
    it("anchor default state", () => {
      expect(navigationPresenter.viewModel.currentSelectedVisibleName).toBe("");
      expect(navigationPresenter.viewModel.showBack).toBe(false);
      expect(navigationPresenter.viewModel.menuItems).toEqual([]);
    });
  });

  describe("login", () => {
    beforeEach(async () => {
      await appTestHarness.setupLogin(GetSuccessfulRegistrationStub);
    });

    it("should navigate down the navigation tree", async () => {
      expect(navigationPresenter.viewModel.currentSelectedVisibleName).toBe(
        "Home > homeLink"
      );

      await router.goToId("authorsLink");
      expect(navigationPresenter.viewModel.showBack).toBe(true);
      expect(navigationPresenter.viewModel.menuItems.length).toBe(2);
      expect(navigationPresenter.viewModel.currentSelectedVisibleName).toBe(
        "Authors > authorsLink"
      );

      await router.goToId("authorsLink-authorPolicyLink");
      expect(navigationPresenter.viewModel.showBack).toBe(true);
      expect(navigationPresenter.viewModel.menuItems.length).toBe(0);
      expect(navigationPresenter.viewModel.currentSelectedVisibleName).toBe(
        "Author Policy > authorsLink-authorPolicyLink"
      );
    });

    it("should move back twice", async () => {
      await router.goToId("authorsLink");
      await router.goToId("authorsLink-authorPolicyLink");

      expect(navigationPresenter.viewModel.currentSelectedVisibleName).toBe(
        "Author Policy > authorsLink-authorPolicyLink"
      );

      await navigationPresenter.back();
      await navigationPresenter.back();

      expect(navigationPresenter.viewModel.currentSelectedVisibleName).toBe(
        "Home > homeLink"
      );
    });
  });
});
