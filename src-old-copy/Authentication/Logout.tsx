import { observer } from "mobx-react";
import * as React from "react";

import { useInject } from "../Core/Providers/Injection";
import { InjectableProps } from "../libs/react-di";
import { LoginRegisterPresenter } from "./LoginRegisterPresenter";

const services: InjectableProps<{
  presenter: LoginRegisterPresenter;
}> = {
  presenter: LoginRegisterPresenter,
};

export const LogoutComp = observer(() => {
  const { presenter } = useInject(services);

  return (
    <button
      onClick={() => {
        presenter.logOut();
      }}
      className="navigation-item"
      style={{ backgroundColor: "#5BCA06" }}
    >
      <span>☯ Logout</span>
    </button>
  );
});
