import { observer } from "mobx-react";
import * as React from "react";

import { useInject } from "../Core/Providers/Injection";
import { InjectableProps } from "../libs/react-di";
import { Artboard } from "./Artboard/Artboard";
import { ArtboardBottombar } from "./Artboard/ArtboardBottombar/ArtboardBottombar";
import { ArtboardCanvas } from "./Artboard/ArtboardCanvas/ArtboardCanvas";
import { ArtboardLeftbar } from "./Artboard/ArtboardLeftbar/ArtboardLeftbar";
import { ArtboardRightbar } from "./Artboard/ArtboardRightbar/ArtboardRightbar";
import { ArtboardTopbar } from "./Artboard/ArtboardTopbar/ArtboardTopbar";
import { DesignerLayout } from "./DesignerLayout/DesignerLayout";
import { DesignerPresenters } from "./DesignerPresenters";
import { Preview } from "./Preview/Preview";

const services: InjectableProps<{
  presenter: DesignerPresenters;
}> = {
  presenter: DesignerPresenters,
};

export const DesignerComponent = observer(() => {
  const { presenter } = useInject(services);

  return (
    <DesignerLayout>
      <DesignerLayout.Sidebar>Sidebar</DesignerLayout.Sidebar>
      <DesignerLayout.Main>
        <button onClick={() => (presenter.visiblePage = "Artboard")}>
          Design
        </button>{" "}
        |{" "}
        <button onClick={() => (presenter.visiblePage = "Preview")}>
          Preview
        </button>
        {presenter.visiblePage === "Artboard" && (
          <Artboard>
            <Artboard.Row>
              <ArtboardTopbar />
            </Artboard.Row>
            <Artboard.Middle>
              <Artboard.Column width="100px">
                <ArtboardLeftbar />
              </Artboard.Column>
              <Artboard.Column width="600px">
                <ArtboardCanvas />
              </Artboard.Column>
              <Artboard.Column width="100px">
                <ArtboardRightbar />
              </Artboard.Column>
            </Artboard.Middle>
            <Artboard.Row>
              <ArtboardBottombar />
            </Artboard.Row>
          </Artboard>
        )}
        {presenter.visiblePage === "Preview" && <Preview />}
      </DesignerLayout.Main>
    </DesignerLayout>
  );
});
