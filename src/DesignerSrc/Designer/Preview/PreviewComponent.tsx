import { PageSwitcher } from "../../Features/PageSwitcher/PageSwitcher";
import { VisiblePage } from "../DesignerTypes";

type PreviewComponentProps = {
  // eslint-disable-next-line no-unused-vars
  setVisiblePage: (page: VisiblePage) => void;
};

// the same pattern as Artboard module
export const PreviewComponent = ({ setVisiblePage }: PreviewComponentProps) => {
  return (
    <div>
      <PageSwitcher setVisiblePage={setVisiblePage} />
    </div>
  );
};
