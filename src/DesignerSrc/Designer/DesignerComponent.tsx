import { observer } from "mobx-react";
import * as React from "react";

import { useInject } from "../../Core/Providers/Injection";
import { InjectableProps } from "../../libs/react-di";
import { ArtboardComponent } from "./Artboard/ArtboardComponent";
import { DesignerLayout } from "./DesignerLayout";
import { DesignerPresenters } from "./DesignerPresenters";
import { PreviewComponent } from "./Preview/PreviewComponent";
import { SidebarComponent } from "./Sidebar/SidebarComponent";

const services: InjectableProps<{
  presenters: DesignerPresenters;
}> = {
  presenters: DesignerPresenters,
};

export const DesignerComponent = observer(() => {
  const { presenters } = useInject(services);

  return (
    <DesignerLayout>
      <DesignerLayout.Sidebar>
        <SidebarComponent />
      </DesignerLayout.Sidebar>
      <DesignerLayout.Main>
        {presenters.visiblePage === "Artboard" && (
          <ArtboardComponent
            presenter={presenters.artboardPresenter}
            setVisiblePage={presenters.setVisiblePage}
          />
        )}
        {presenters.visiblePage === "Preview" && (
          <PreviewComponent setVisiblePage={presenters.setVisiblePage} />
        )}
      </DesignerLayout.Main>
    </DesignerLayout>
  );
});
