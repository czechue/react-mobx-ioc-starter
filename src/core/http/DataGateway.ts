import axios, { AxiosResponse } from "axios";
import { inject, injectable } from "inversify";

import { Config } from "./Config";

@injectable()
export class HttpGateway {
  @inject(Config)
  config!: Config;

  get = async <R>(path: string): Promise<AxiosResponse<R>> => {
    return await axios.get<R>(this.config.apiUrl + path);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(indicatorsDto as any)
    //   }, 150)
    // })
  };
}
