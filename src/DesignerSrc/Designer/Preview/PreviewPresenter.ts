import { injectable } from "inversify";
import { makeObservable, observable } from "mobx";

type PreviewVm = any;

@injectable()
export class PreviewPresenter {
  previewVm: PreviewVm;

  constructor() {
    makeObservable(this, {
      previewVm: observable,
    });
  }
}
