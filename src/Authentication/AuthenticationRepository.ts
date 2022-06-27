import { inject, injectable } from "inversify";
import { action, makeObservable } from "mobx";

import { HttpGateway } from "../Core/Http/HttpGateway";
import { MessagePacking } from "../Core/Messages/MessagePacking";
import { Types } from "../Core/Types";
import { Router } from "../Routing/Router";
import { UserModel } from "./UserModel";

@injectable()
export class AuthenticationRepository {
  @inject(Router)
  router!: Router;

  @inject(Types.IHttpGateway)
  httpGateway!: HttpGateway;

  @inject(UserModel)
  userModel!: UserModel;

  constructor() {
    makeObservable(this, {
      login: action,
    });
  }

  login = async (email: string, password: string) => {
    const loginDto = await this.httpGateway.post<any, any>("/login", {
      email: email,
      password: password,
    });

    if (loginDto.success) {
      this.userModel.email = email;
      this.userModel.token = loginDto.result.token;
    }

    return MessagePacking.unpackServerDtoToPm(loginDto);
  };

  register = async (email: string, password: string) => {
    const registerDto = await this.httpGateway.post<any, any>("/register", {
      email: email,
      password: password,
    });

    return MessagePacking.unpackServerDtoToPm(registerDto);
  };

  logOut = async () => {
    this.userModel.email = "";
    this.userModel.token = "";
  };
}
