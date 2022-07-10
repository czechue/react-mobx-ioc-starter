import { injectable } from "inversify";
import { computed, makeObservable } from "mobx";

import { ArtboardViewModel } from "./ArtboardTypes";

@injectable()
export class ArtboardPresenter {
  constructor() {
    makeObservable(this, {
      viewModel: computed,
    });
  }

  get viewModel() {
    const vm: ArtboardViewModel = {
      topbarVm: {
        showCentral: false,
        showControls: false,
        showNavigationPanel: true,
      },
      rightbarVm: {},
      bottombarVm: {},
      leftbarVm: {},
      canvasVm: {},
    };

    return vm;
  }
}
