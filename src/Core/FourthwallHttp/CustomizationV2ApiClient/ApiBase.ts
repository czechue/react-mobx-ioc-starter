import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import omitBy from "lodash/omitBy";
import queryString from "query-string";

export type FourthwallUrl = `https://${string}fourthwall.com${string}`;

export type UrlMap = {
  development: FourthwallUrl;
  staging: FourthwallUrl;
  production: FourthwallUrl;
};

const DEFAULT_URL_MAP: UrlMap = {
  development: "https://api.staging.fourthwall.com/api",
  staging: "https://api.staging.fourthwall.com/api",
  production: "https://api.fourthwall.com/api",
};

export abstract class ApiBase {
  instance: AxiosInstance;

  private baseUrl = "";

  constructor(customUrl?: string | UrlMap) {
    this.baseUrl = this.getUrl(customUrl);
    this.instance = axios.create({
      baseURL: this.baseUrl,
      paramsSerializer: (params) => queryString.stringify(params),
    });
  }

  getUrl = (customUrl?: string | UrlMap) => {
    const env = process.env.TARGET_ENV;

    if (customUrl) {
      // @ts-ignore
      return typeof customUrl === "string" ? customUrl : customUrl[env];
    }

    // @ts-ignore
    return DEFAULT_URL_MAP[env] || DEFAULT_URL_MAP.production;
  };

  setMaxRequestsCount = (maxRequestsCount = 5) => {
    const MAX_REQUESTS_COUNT = maxRequestsCount;
    const INTERVAL_MS = 10;

    let PENDING_REQUESTS = 0;

    this.instance.interceptors.request.use((config) => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
            PENDING_REQUESTS++;
            clearInterval(interval);
            resolve(config);
          }
        }, INTERVAL_MS);
      });
    });

    this.instance.interceptors.response.use(
      (response) => {
        PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);

        return Promise.resolve(response);
      },
      (error) => {
        PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);

        return Promise.reject(error);
      }
    );
  };

  protected getUnsafe = <Response>(
    path: string,
    params?: any,
    headers?: any
  ) => {
    return this.instance.get<Response>(path, { params, headers });
  };

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

  // other
  protected getLink = (path: string) => {
    return `${this.baseUrl}${path}`;
  };

  // utils
  protected getQuery = <Params>(params: Object & Params) => {
    const nonEmptyParams = omitBy(params, (item) => !item);

    if (isEmpty(nonEmptyParams)) {
      return "";
    }

    return `?${queryString.stringify(nonEmptyParams)}`;
  };

  setAuthorizationHeader = (token: string) => {
    this.setHeader("Authorization", `Bearer ${token}`);
  };

  removeAuthorizationHeader = () => {
    this.removeHeader("Authorization");
  };

  setHeader = (key: string, value: any) => {
    this.instance.defaults.headers.common[key] = value;
  };

  removeHeader = (key: string) => {
    delete this.instance.defaults.headers.common[key];
  };

  addErrorResponseInterceptor = (
    // eslint-disable-next-line no-unused-vars
    errorInterceptor: (_error: AxiosError) => Promise<AxiosError>
  ) => {
    this.instance.interceptors.response.use(
      (success) => success,
      errorInterceptor
    );
  };

  addRequestInterceptor = (
    interceptor: (
      // eslint-disable-next-line no-unused-vars
      config: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  ): number => {
    return this.instance.interceptors.request.use(interceptor);
  };

  removeRequestInterceptor = (interceptorId: number) => {
    this.instance.interceptors.request.eject(interceptorId);
  };
}
