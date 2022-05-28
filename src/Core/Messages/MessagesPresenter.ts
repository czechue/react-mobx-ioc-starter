import { inject, injectable } from "inversify";
import { action, computed, makeObservable, observable } from "mobx";

import { MessagesRepository } from "./MessagesRepository";

@injectable()
export class MessagesPresenter {
  @inject(MessagesRepository)
  messagesRepository!: MessagesRepository;

  showValidationWarning: boolean | null = null;

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

  init = () => {
    this.showValidationWarning = false;
    this.messagesRepository.reset();
  };

  unpackRepositoryPmToVm = (
    pm: { success: boolean; serverMessage: string },
    userMessage: string
  ) => {
    this.showValidationWarning = !pm.success;
    this.messagesRepository.appMessages = pm.success
      ? [userMessage]
      : [pm.serverMessage];
  };
}
