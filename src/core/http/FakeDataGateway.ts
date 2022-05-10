import { inject, injectable } from "inversify";

import { Config } from "./Config";

@injectable()
export class FakeHttpGateway {
  @inject(Config)
  config!: Config;

  // eslint-disable-next-line no-unused-vars
  get = async (path: string) => {};
}
