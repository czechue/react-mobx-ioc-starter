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
  topbarVm: ArtboardTopbarVm;
  rightbarVm: ArtboardRightbarVm;
  bottombarVm: ArtboardBottombarVm;
  leftbarVm: ArtboardLeftbarVm;
  canvasVm: ArtboardCanvasVm;
};
