import { injectable } from "inversify";

@injectable()
export class HttpConfig {
  apiUrl;

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL;
  }
}
