import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { MessagesPresenter } from "../Core/Messages/MessagesPresenter";
import { Router } from "../Routing/Router";
import { AuthenticationRepository } from "./AuthenticationRepository";

@injectable()
export class LoginRegisterPresenter extends MessagesPresenter {
  @inject(AuthenticationRepository)
  authenticationRepository!: AuthenticationRepository;

  @inject(Router)
  router!: Router;

  email = "";
  password = "";
  option: "login" | "register" = "login";

  constructor() {
    super();
    makeObservable(this, {
      email: observable,
      password: observable,
      option: observable,
      reset: action,
      login: action,
      register: action,
      logOut: action,
    });
    this.init();
  }

  reset = () => {
    this.email = "";
    this.password = "";
    this.option = "login";
  };

  login = async () => {
    let loginPm = await this.authenticationRepository.login(
      this.email,
      this.password
    );

    this.unpackRepositoryPmToVm(loginPm, "User logged in");

    if (loginPm.success) {
      await this.router.goToId("homeLink", "");
    }
  };

  register = async () => {
    let registerPm = await this.authenticationRepository.register(
      this.email,
      this.password
    );

    this.unpackRepositoryPmToVm(registerPm, "User registered");
  };

  logOut = async () => {
    console.log("1");
    await this.authenticationRepository.logOut();
    await this.router.goToId("loginLink", "");
  };
}
