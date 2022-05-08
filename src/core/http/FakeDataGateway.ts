import { inject, injectable } from "inversify";

import { Config } from "./Config";

@injectable()
export class FakeHttpGateway {
  @inject(Config)
  config!: Config;

  get = async (path: string) => {};
}
