import { injectable } from "inversify";
import { makeObservable, observable } from "mobx";

@injectable()
export class UserModel {
  email = "";

  token = "";

  constructor() {
    makeObservable(this, {
      email: observable,
      token: observable,
    });
  }
}
