import { inject, injectable } from "inversify";
import { computed, makeObservable } from "mobx";

import { Router } from "../../../Routing/Router";
import { CustomizationRepository } from "../../Repositories/CustomizationRepository";
import { ArtboardViewModel } from "./ArtboardTypes";

@injectable()
export class ArtboardPresenter {
  @inject(Router)
  router!: Router;

  @inject(CustomizationRepository)
  customizationRepository!: CustomizationRepository;

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

  load = async () => {
    // todo: fix getting current pathId from router (for now mocked customization id)
    const customizationId =
      typeof this.router.currentRoute.params === "string"
        ? this.router.currentRoute.params
        : "fakeCustomizationId";

    await this.customizationRepository.load(customizationId);
  };
}
