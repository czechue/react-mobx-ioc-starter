import { observer } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";

import { useInject } from "../core/DI";
import { Header } from "../core/Navigation/Header/Header";
import { InjectableProps } from "../libs/react-di";
import { AppPresenter } from "./AppPresenter";

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
      id: "homeLink",
      component: <div key="homeLink">home component</div>,
    },
    {
      id: "faqLink",
      component: <div key="faqLink">faq component</div>,
    },
  ];

  return (
    <div>
      <div>
        <div>
          <Header />
        </div>
        <div>
          {renderedComponents.map((current) => {
            return presenter.currentRouteId === current.id && current.component;
          })}
        </div>
      </div>
    </div>
  );
});
