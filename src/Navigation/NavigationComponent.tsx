import { observer } from "mobx-react";
import * as React from "react";

import { LogoutComponent } from "../Authentication/LogoutComponent";
import { useInject } from "../Core/Providers/Injection";
import { InjectableProps } from "../libs/react-di";
import { Router } from "../Routing/Router";
import { NavigationPresenter } from "./NavigationPresenter";

const services: InjectableProps<{
  navigationPresenter: NavigationPresenter;
  routerPresenter: Router;
}> = {
  navigationPresenter: NavigationPresenter,
  routerPresenter: Router,
};

export const NavigationComponent = observer(() => {
  const { navigationPresenter, routerPresenter } = useInject(services);

  console.log("NavigationComponent");

  return (
    <div className="navigation-container">
      <div
        className="navigation-item-header"
        style={{ backgroundColor: "#5BCA06" }}
      >
        {navigationPresenter.viewModel.currentSelectedVisibleName}
      </div>
      {navigationPresenter.viewModel.menuItems.map(
        (menuItem: any, i: number) => {
          return (
            <div
              onKeyDown={() => console.log("1menuItem", menuItem)}
              tabIndex={0}
              key={i}
              role="button"
              className="navigation-item"
              style={{
                backgroundColor: "#3DE7CF",
              }}
              onClick={() => {
                routerPresenter.goToId(menuItem.id);
              }}
            >
              {menuItem.visibleName}
            </div>
          );
        }
      )}
      {navigationPresenter.viewModel.showBack && (
        <div
          onKeyDown={() => console.log("xx")}
          tabIndex={0}
          role="button"
          className="navigation-item"
          onClick={() => {
            navigationPresenter.back();
          }}
          style={{ backgroundColor: "#2e91fc" }}
        >
          <span>⬅ </span>Back
        </div>
      )}
      <LogoutComponent />
    </div>
  );
});
