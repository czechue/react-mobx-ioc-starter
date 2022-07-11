import { observer } from "mobx-react";

import { useInject } from "../../../Core/Providers/Injection";
import { InjectableProps } from "../../../libs/react-di";
import { NavigationPanelPresenter } from "./NavigationPanelPresenter";
import * as S from "./NavigationPanelStyled";

const services: InjectableProps<{
  presenter: NavigationPanelPresenter;
}> = {
  presenter: NavigationPanelPresenter,
};

export const NavigationPanelComponent = observer(() => {
  const { presenter } = useInject(services);

  return (
    <div style={{ width: "300px", textAlign: "end" }}>
      <S.Button onClick={presenter.goBack}> Back </S.Button>
      <S.Button style={{ marginLeft: "16px" }} onClick={presenter.submitDraft}>
        Next
      </S.Button>
    </div>
  );
});
