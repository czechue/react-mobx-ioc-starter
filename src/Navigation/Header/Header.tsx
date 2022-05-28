import { observer } from "mobx-react";
import React from "react";

import { useInject } from "../../Core/Providers/Injection";
import { InjectableProps } from "../../libs/react-di";
import { Router } from "../../Routing/Router";
import { RoutingState } from "../../Routing/RoutingState";
import { NavigationPresenter } from "../NavigationPresenter";
import { NavigationItemComponent } from "./NavigationItemComponent";

const services: InjectableProps<{
  router: Router;
  navigationPresenter: NavigationPresenter;
  routingState: RoutingState;
}> = {
  router: Router,
  navigationPresenter: NavigationPresenter,
  routingState: RoutingState,
};

type Model = { id: string; text: string; type: string };

export const Header = observer(() => {
  const { navigationPresenter, router } = useInject(services);

  console.log("Header", navigationPresenter.viewModel().children);

  return (
    <nav>
      <div>
        <ul>
          {navigationPresenter
            .viewModel()
            .children.map(({ model }: { model: Model }) => {
              return (
                <NavigationItemComponent
                  key={model.id}
                  id={model.id}
                  text={model.text}
                  goToId={router.goToId}
                  isActive={
                    navigationPresenter.currentSelectedNavigationNode ===
                    model.id
                  }
                />
              );
            })}
        </ul>
      </div>
    </nav>
  );
});
