import { observer } from "mobx-react";
import * as React from "react";
import { useTheme } from "styled-components";

import { AppPresenter } from "./AppPresenter";
import { LoginRegisterComponent } from "./Authentication/LoginRegisterComponent";
import { AuthorsComponent } from "./Authors/AuthorsComponent";
import { BooksComponent } from "./Books/BooksComponent";
import { Box, Center, Sidebar } from "./Components/layouts";
import { useInject } from "./Core/Providers/Injection";
import { useValidation } from "./Core/Providers/Validation";
import { DesignerComponent } from "./Designer/DesignerComponent";
import { EveryLayoutComponent } from "./ExampleComponents/EveryLayoutComponent";
import { HomeComponent } from "./Home/HomeComponent";
import { InjectableProps } from "./libs/react-di";
import { NavigationComponent } from "./Navigation/NavigationComponent";

const services: InjectableProps<{
  appPresenter: AppPresenter;
}> = {
  appPresenter: AppPresenter,
};

export const AppComponent = observer(() => {
  const { appPresenter } = useInject(services);
  const { space } = useTheme();

  const { updateClientValidationMessages } = useValidation();

  React.useEffect(() => {
    appPresenter.load(onRouteChange);
  }, []);

  const onRouteChange = () => {
    updateClientValidationMessages([]);
  };

  const renderedComponents = [
    {
      id: "homeLink",
      component: <HomeComponent key="homePage" />,
    },
    {
      id: "rootLink",
      component: <div key="rootLink">root component</div>,
    },
    {
      id: "booksLink",
      component: <BooksComponent key="booksLink" />,
    },
    {
      id: "authorsLink",
      component: <AuthorsComponent key="authorsLink" />,
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

  if (appPresenter.currentRoute.routeId === "designerLink") {
    return <DesignerComponent />;
  }

  return (
    <div>
      {appPresenter.currentRoute.routeId === "loginLink" ? (
        <LoginRegisterComponent />
      ) : (
        <Center max={space.measure1}>
          <Sidebar>
            <Box>
              <div style={{ minWidth: "200px" }}>
                <NavigationComponent />
              </div>
            </Box>
            <div style={{ minWidth: "300px" }}>
              <Box borderWidth={"0"}>
                <div
                  className="navigation-item-header"
                  style={{ backgroundColor: "#5BCA06" }}
                >
                  {appPresenter.currentSelectedVisibleName}
                </div>
                {renderedComponents.map((current) => {
                  return (
                    appPresenter.currentRoute.routeId === current.id &&
                    current.component
                  );
                })}
              </Box>
            </div>
          </Sidebar>
        </Center>
      )}
    </div>
  );
});
