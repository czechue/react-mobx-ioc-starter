import { observer } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";

import { AppPresenter } from "./AppPresenter";
import { useInject } from "./Core/Providers/Injection";
import { EveryLayoutComponent } from "./ExampleComponents/EveryLayoutComponent";
import { InjectableProps } from "./libs/react-di";
import { Header } from "./Navigation/Header/Header";

const services: InjectableProps<{
  presenter: AppPresenter;
}> = {
  presenter: AppPresenter,
};

export const AppComponent = observer(() => {
  const { presenter } = useInject(services);

  useEffect(() => {
    presenter.bootstrap();
  }, [presenter]);

  const renderedComponents = [
    {
      id: "rootLink",
      component: <div key="rootLink">root component</div>,
    },
    {
      id: "everyLayoutLink",
      component: (
        <div key="everyLayoutLink">
          <EveryLayoutComponent />
        </div>
      ),
    },
    {
      id: "faqLink",
      component: <div key="faqLink">faq component</div>,
    },
  ];

  return (
    <div>
      <Header />
      {renderedComponents.map((current) => {
        return presenter.currentRouteId === current.id && current.component;
      })}
    </div>
  );
});
