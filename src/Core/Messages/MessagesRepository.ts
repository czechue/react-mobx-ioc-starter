import { injectable } from "inversify";
import { makeObservable, observable } from "mobx";

@injectable()
export class MessagesRepository {
  appMessages: string[] | null = null;

  constructor() {
    makeObservable(this, {
      appMessages: observable,
    });
    this.reset();
  }

  reset = () => {
    this.appMessages = [];
  };
}
