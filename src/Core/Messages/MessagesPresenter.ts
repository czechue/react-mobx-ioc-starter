import { inject, injectable } from "inversify";
import { action, computed, makeObservable, observable } from "mobx";

import { MessagesRepository } from "./MessagesRepository";

@injectable()
export class MessagesPresenter {
  @inject(MessagesRepository)
  messagesRepository!: MessagesRepository;

  showValidationWarning = false;

  get messages() {
    return this.messagesRepository.appMessages;
  }

  constructor() {
    makeObservable(this, {
      showValidationWarning: observable,
      messages: computed,
      unpackRepositoryPmToVm: action,
    });
  }

  initMessages = () => {
    this.showValidationWarning = false;
    // @ts-ignore
    this.messagesRepository?.reset();
  };

  unpackRepositoryPmToVm = (
    pm: { success: boolean; serverMessage: string },
    userMessage: string
  ) => {
    console.log("unpack", pm);
    this.showValidationWarning = !pm.success;
    this.messagesRepository.appMessages = pm.success
      ? [userMessage]
      : [pm.serverMessage];
  };
}
