import { inject, injectable } from "inversify";
import { action, makeObservable } from "mobx";

import { DraftRepository } from "../../repositories/DraftRepository";

@injectable()
export class NavigationPanelPresenter {
  @inject(DraftRepository)
  draftRepository!: DraftRepository;

  constructor() {
    makeObservable(this, {
      submitDraft: action,
      goBack: action,
    });
  }

  goBack = () => {
    console.log("NavigationPanelPresenter goBack");
    alert("NavigationPanelPresenter goBack");
  };

  submitDraft = async () => {
    console.log("NavigationPanelPresenter submitDraft");
    alert("NavigationPanelPresenter submitDraft");

    try {
      await this.draftRepository.submitDraft();
    } catch (e) {
      console.log("e", e);
    }
  };
}
