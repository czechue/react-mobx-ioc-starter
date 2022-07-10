import { injectable } from "inversify";
import { makeObservable, observable } from "mobx";

type VisiblePage = "Artboard" | "Preview";

@injectable()
export class DesignerPresenters {
  visiblePage: VisiblePage = "Artboard";

  constructor() {
    makeObservable(this, {
      visiblePage: observable,
    });
  }
}
