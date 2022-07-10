import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";

import { ArtboardPresenter } from "./Artboard/ArtboardPresenter";
import { PreviewPresenter } from "./Preview/PreviewPresenter";
import { SidebarPresenter } from "./Sidebar/SidebarPresenter";

type VisiblePage = "Artboard" | "Preview";

@injectable()
export class DesignerPresenters {
  // common state for Artboard, Preview and Sidebar
  visiblePage: VisiblePage = "Artboard";

  @inject(ArtboardPresenter)
  artboardPresenter!: ArtboardPresenter;

  @inject(PreviewPresenter)
  previewPresenter!: PreviewPresenter;

  @inject(SidebarPresenter)
  sidebarPresenter!: SidebarPresenter;

  constructor() {
    makeObservable(this, {
      visiblePage: observable,
      artboardPresenter: observable,
      previewPresenter: observable,
      sidebarPresenter: observable,
    });
  }
}
