import { inject, injectable } from "inversify";
import { computed, makeObservable } from "mobx";

import { NavigationPanelPresenter } from "../features/NavigationPanel/NavigationPanelPresenter";

type ArtboardTopbarVm = any;

type ArtboardRightbarVm = any;

type ArtboardBottombarVm = any;

type ArtboardLeftbarVm = any;

type ArtboardCanvasVm = any;

type ArtboardViewModel = {
  topbarVm: ArtboardTopbarVm;
  rightbarVm: ArtboardRightbarVm;
  bottombarVm: ArtboardBottombarVm;
  leftbarVm: ArtboardLeftbarVm;
  canvasVm: ArtboardCanvasVm;
};

@injectable()
export class ArtboardPresenter {
  @inject(NavigationPanelPresenter)
  navigationPanelPresenter!: NavigationPanelPresenter;

  constructor() {
    makeObservable(this, {
      viewModel: computed,
    });
  }

  get viewModel() {
    const vm: ArtboardViewModel = {
      topbarVm: {
        test: "1",
      },
      rightbarVm: {},
      bottombarVm: {},
      leftbarVm: {},
      canvasVm: {},
    };

    return vm;
  }
}
