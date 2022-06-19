import { injectable } from "inversify";

import { HttpConfig } from "./HttpConfig";

@injectable()
export class FakeHttpGateway {
  config!: HttpConfig;

  // eslint-disable-next-line no-unused-vars
  get = async (path: string) => {};
}
