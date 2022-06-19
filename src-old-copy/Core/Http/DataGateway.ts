import axios, { AxiosResponse } from "axios";
import { inject, injectable } from "inversify";

import { UserModel } from "../../Authentication/UserModel";
import { HttpConfig } from "./HttpConfig";

@injectable()
export class HttpGateway {
  @inject(HttpConfig)
  config!: HttpConfig;

  @inject(UserModel)
  userModel!: UserModel;

  get = async (path: string) => {
    const response = await fetch(this.config.apiUrl + path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.userModel.token || "",
      },
    });
    const dto = response.json();
    return dto;
  };

  post = async (path: string, requestDto: any) => {
    const response = await fetch(this.config.apiUrl + path, {
      method: "POST",
      body: JSON.stringify(requestDto),
      headers: {
        "Content-Type": "application/json",
        Authorization: this.userModel.token || "",
      },
    });
    const dto = response.json();
    return dto;
  };

  delete = async (path: string) => {
    const response = await fetch(this.config.apiUrl + path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.userModel.token || "",
      },
    });
    const dto = response.json();
    return dto;
  };
}
