import { observer } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";

import { ArtboardBottombar } from "./ArtboardBottombar/ArtboardBottombar";
import { ArtboardCanvas } from "./ArtboardCanvas/ArtboardCanvas";
import { Artboard } from "./ArtboardLayout";
import { ArtboardLeftbar } from "./ArtboardLeftbar/ArtboardLeftbar";
import { ArtboardPresenter } from "./ArtboardPresenter";
import { ArtboardRightbar } from "./ArtboardRightbar/ArtboardRightbar";
import { ArtboardTopbar } from "./ArtboardTopbar/ArtboardTopbar";

type ArtboardProps = {
  presenter: ArtboardPresenter;
};

export const ArtboardComponent = observer(({ presenter }: ArtboardProps) => {
  useEffect(() => {
    presenter.loadCustomization();
  }, []);

  return (
    <Artboard>
      <Artboard.Row>
        <ArtboardTopbar vm={presenter.viewModel.topbar} />
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
  );
});
