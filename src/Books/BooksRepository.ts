import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";

import { UserModel } from "../Authentication/UserModel";
// import { HttpConfig } from "../Core/Http/HttpConfig";
import { HttpGateway } from "../Core/Http/HttpGateway";
import { Types } from "../Core/Types";

@injectable()
export class BooksRepository {
  baseUrl = "/books";

  @inject(Types.IHttpGateway)
  dataGateway!: HttpGateway;

  @inject(UserModel)
  userModel!: UserModel;

  // @inject(HttpConfig)
  // config!: HttpConfig;

  messagePm = "UNSET";

  constructor() {
    makeObservable(this, { messagePm: observable });
  }

  load = () => {
    setTimeout(() => {
      this.messagePm = "LOADED";
    }, 2000);
  };

  reset = () => {
    this.messagePm = "RESET";
  };
}
