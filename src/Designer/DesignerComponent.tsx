import { observer } from "mobx-react";
import * as React from "react";

import { useInject } from "../Core/Providers/Injection";
import { InjectableProps } from "../libs/react-di";
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
        <button onClick={() => (presenters.visiblePage = "Artboard")}>
          Design
        </button>{" "}
        |{" "}
        <button onClick={() => (presenters.visiblePage = "Preview")}>
          Preview
        </button>
        {presenters.visiblePage === "Artboard" && (
          <ArtboardComponent presenter={presenters.artboardPresenter} />
        )}
        {presenters.visiblePage === "Preview" && <PreviewComponent />}
      </DesignerLayout.Main>
    </DesignerLayout>
  );
});
