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
      topbar: {
        showCentral: false,
        showControls: false,
        showNavigationPanel: true,
      },
      rightbar: {},
      bottombar: {},
      leftbar: {},
      canvas: {},
    };

    return vm;
  }
}
