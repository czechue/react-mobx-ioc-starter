import { observer } from "mobx-react";

import { PageSwitcher } from "../../../Features/PageSwitcher/PageSwitcher";
import { VisiblePage } from "../../DesignerTypes";

type ArtboardBottombarProps = {
  // eslint-disable-next-line no-unused-vars
  setVisiblePage: (page: VisiblePage) => void;
};

export const ArtboardBottombar = observer(
  ({ setVisiblePage }: ArtboardBottombarProps) => {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <PageSwitcher setVisiblePage={setVisiblePage} />
      </div>
    );
  }
);
