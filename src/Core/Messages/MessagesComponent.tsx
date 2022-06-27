import { observer } from "mobx-react";
import * as React from "react";

import { AppPresenter } from "../../AppPresenter";
import { InjectableProps } from "../../libs/react-di";
import { useInject } from "../Providers/Injection";
import { useValidation } from "../Providers/Validation";
import { MessagesPresenter } from "./MessagesPresenter";

const services: InjectableProps<{
  presenter: MessagesPresenter;
}> = {
  presenter: MessagesPresenter,
};

export const MessagesComponent = observer(() => {
  const { presenter } = useInject(services);
  let { clientValidationMessages: uiMessages } = useValidation();

  return (
    <>
      {presenter.messages &&
        presenter.messages.map((item, i) => {
          return (
            <div style={{ backgroundColor: "red" }} key={i}>
              {" - "}
              {item}
            </div>
          );
        })}

      {uiMessages &&
        uiMessages.map((item, i) => {
          return (
            <div style={{ backgroundColor: "orange" }} key={i}>
              {" - "}
              {item}
            </div>
          );
        })}
    </>
  );
});
