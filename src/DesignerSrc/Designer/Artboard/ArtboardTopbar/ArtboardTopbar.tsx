import { NavigationPanelComponent } from "../../../Features/NavigationPanel/NavigationPanelComponent";
import { ArtboardTopbarVm } from "../ArtboardTypes";

type ArtboardTopbarProps = {
  vm: ArtboardTopbarVm;
};

export const ArtboardTopbar = ({ vm }: ArtboardTopbarProps) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>{vm.showControls && "Controls"}</div>
      <div>{vm.showCentral && "Central Place"}</div>
      <div>{vm.showNavigationPanel && <NavigationPanelComponent />}</div>
    </div>
  );
};
