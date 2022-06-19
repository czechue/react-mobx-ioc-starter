import { observer } from "mobx-react";
import * as React from "react";

import { AppPresenter } from "./AppPresenter";
import { LoginRegisterComponent } from "./Authentication/LoginRegisterComponent";
import { useInject } from "./Core/Providers/Injection";
import { useValidation } from "./Core/Providers/Validation";
import { EveryLayoutComponent } from "./ExampleComponents/EveryLayoutComponent";
import { InjectableProps } from "./libs/react-di";

const services: InjectableProps<{
  presenter: AppPresenter;
}> = {
  presenter: AppPresenter,
};

export const AppComponent = observer(() => {
  const { presenter } = useInject(services);

  const { updateClientValidationMessages } = useValidation();

  React.useEffect(() => {
    presenter.load(onRouteChange);
  }, []);

  const onRouteChange = () => {
    updateClientValidationMessages([]);
  };

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
      {presenter.currentRoute.routeId === "loginLink" ? (
        <LoginRegisterComponent />
      ) : (
        <>
          {" "}
          {renderedComponents.map((current) => {
            return (
              presenter.currentRoute.routeId === current.id && current.component
            );
          })}
        </>
      )}
    </div>
  );
});
