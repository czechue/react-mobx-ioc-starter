export type ArtboardTopbarVm = {
  showControls: boolean;
  showCentral: boolean;
  showNavigationPanel: boolean;
};

export type ArtboardRightbarVm = any;

export type ArtboardBottombarVm = any;

export type ArtboardLeftbarVm = any;

export type ArtboardCanvasVm = any;

export type ArtboardViewModel = {
  topbar: ArtboardTopbarVm;
  rightbar: ArtboardRightbarVm;
  bottombar: ArtboardBottombarVm;
  leftbar: ArtboardLeftbarVm;
  canvas: ArtboardCanvasVm;
};
