import { observer } from "mobx-react";
import * as React from "react";
import { KeyboardEventHandler } from "react";

import { useInject } from "../Core/Providers/Injection";
import { InjectableProps } from "../libs/react-di";
import { LoginRegisterPresenter } from "./LoginRegisterPresenter";

const services: InjectableProps<{
  presenter: LoginRegisterPresenter;
}> = {
  presenter: LoginRegisterPresenter,
};

export const LogoutComponent = observer(() => {
  const { presenter } = useInject(services);

  const onEnterKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      presenter.logOut();
    }
  };

  return (
    <div
      onClick={presenter.logOut}
      onKeyDown={onEnterKeyDown}
      tabIndex={0}
      role={"button"}
      className="navigation-item"
      style={{ backgroundColor: "#5BCA06" }}
    >
      <span>☯ Logout</span>
    </div>
  );
});
