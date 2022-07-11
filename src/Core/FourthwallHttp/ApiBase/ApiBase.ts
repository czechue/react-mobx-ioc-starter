import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { injectable } from "inversify";
import queryString from "query-string";

export type FourthwallUrl = `https://${string}fourthwall.com${string}`;

export type UrlMap = {
  development: FourthwallUrl;
  staging: FourthwallUrl;
  production: FourthwallUrl;
};

// const DEFAULT_URL_MAP: UrlMap = {
//   development: "https://api.staging.fourthwall.com/api",
//   staging: "https://api.staging.fourthwall.com/api",
//   production: "https://api.fourthwall.com/api",
// };

@injectable()
export class ApiBase {
  instance: AxiosInstance;

  private baseUrl = "https://api.staging.fourthwall.com/api";

  constructor() {
    this.instance = axios.create({
      baseURL: this.baseUrl,
      paramsSerializer: (params) => queryString.stringify(params),
    });
  }

  protected get = <Response>(
    path: string,
    params?: AxiosRequestConfig["params"],
    headers?: AxiosRequestConfig["headers"],
    config?: AxiosRequestConfig
  ) => {
    return this.instance.get<Response>(path, { params, headers, ...config });
  };

  protected getBlob = <Response>(
    path: string,
    params?: AxiosRequestConfig["params"],
    headers?: AxiosRequestConfig["headers"]
  ) => {
    return this.instance.get<Response>(path, {
      params,
      headers,
      responseType: "blob",
    });
  };

  protected post = <Payload, Response = {}>(
    path: string,
    payload?: Payload,
    params?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "params">
  ) => {
    return this.instance.post<Response>(path, payload, { params, ...config });
  };

  protected put = <Payload, Response = {}>(
    path: string,
    payload?: Payload,
    params?: Record<string, string | undefined>,
    config?: Omit<AxiosRequestConfig, "params">
  ) => {
    return this.instance.put<Response>(path, payload, { params, ...config });
  };

  protected delete = <Payload, Response = {}>(
    path: string,
    payload?: Payload,
    params?: any
  ) => {
    return this.instance.delete<Response>(path, { data: payload, params });
  };
}
