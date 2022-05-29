import { injectable } from "inversify";
import { makeObservable, observable } from "mobx";

@injectable()
export class UserModel {
  email: string | null = null;

  token: string | null = null;

  constructor() {
    makeObservable(this, {
      email: observable,
      token: observable,
    });
  }
}
