import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { ArtboardPresenter } from "./Artboard/ArtboardPresenter";
import { VisiblePage } from "./DesignerTypes";
import { PreviewPresenter } from "./Preview/PreviewPresenter";
import { SidebarPresenter } from "./Sidebar/SidebarPresenter";

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
      setVisiblePage: action,
    });
  }

  setVisiblePage = (page: VisiblePage) => {
    this.visiblePage = page;
  };
}
