import { VisiblePage } from "../../Designer/DesignerTypes";
import * as S from "./PageSwitcherStyled";

type PageSwitcherProps = {
  // eslint-disable-next-line no-unused-vars
  setVisiblePage: (page: VisiblePage) => void;
};

export const PageSwitcher = ({ setVisiblePage }: PageSwitcherProps) => {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <S.Button onClick={() => setVisiblePage("Artboard")}> Design </S.Button>
      <S.Button
        style={{ marginLeft: "16px" }}
        onClick={() => setVisiblePage("Preview")}
      >
        Preview
      </S.Button>
    </div>
  );
};
