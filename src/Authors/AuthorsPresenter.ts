import { injectable } from "inversify";
import { makeObservable, observable } from "mobx";

import { MessagesPresenter } from "../Core/Messages/MessagesPresenter";

@injectable()
export class AuthorsPresenter extends MessagesPresenter {
  authorName!: string;

  constructor() {
    super();
    makeObservable(this, {
      authorName: observable,
    });
  }

  load = async () => {
    await new Promise((resolve) =>
      setTimeout(() => {
        this.authorName = Math.random().toString();
        console.log("1");
        resolve({});
      }, 100)
    );
  };
}
