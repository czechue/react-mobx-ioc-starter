import { observer } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";

import { useInject } from "../core/di";
import { Header } from "../core/navigation/Header/Header";
import { InjectableProps } from "../libs/reactDI";
import { AppPresenter } from "./AppPresenter";
import { DomainComponent } from "./domain/DomainComponent";

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
      component: (
        <div key="homeLink">
          <DomainComponent />
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
