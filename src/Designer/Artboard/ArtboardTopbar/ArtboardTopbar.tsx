import { NavigationPanelComponent } from "../../features/NavigationPanel/NavigationPanelComponent";

type ArtboardTopbarProps = {
  vm: any;
};

export const ArtboardTopbar = ({ vm }: ArtboardTopbarProps) => {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginLeft: "auto", width: "100px" }}>
        <NavigationPanelComponent />
      </div>
    </div>
  );
};
