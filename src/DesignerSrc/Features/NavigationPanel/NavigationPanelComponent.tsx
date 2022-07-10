import { observer } from "mobx-react";

import { useInject } from "../../../Core/Providers/Injection";
import { InjectableProps } from "../../../libs/react-di";
import { NavigationPanelPresenter } from "./NavigationPanelPresenter";

const services: InjectableProps<{
  presenter: NavigationPanelPresenter;
}> = {
  presenter: NavigationPanelPresenter,
};

export const NavigationPanelComponent = observer(() => {
  const { presenter } = useInject(services);

  return (
    <div style={{ width: "100px" }}>
      <button onClick={presenter.goBack}> Back </button> |{" "}
      <button onClick={presenter.submitDraft}>Next</button>
    </div>
  );
});
