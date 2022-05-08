import { injectable } from "inversify";

@injectable()
export class Config {
  apiUrl;

  constructor() {
    // @ts-ignore
    if (process.env.NODE_ENV === "development") {
      // 'http://localhost:8080'
      this.apiUrl = "http://localhost:8080";
    } else {
      this.apiUrl = "http://localhost:8080";
    }
  }
}
