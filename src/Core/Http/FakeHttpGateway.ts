/* eslint-disable no-unused-vars */
import { injectable } from "inversify";

@injectable()
export class FakeHttpGateway {
  get = async (path: string) => {};

  post = async (path: string, requestDto: string) => {};

  delete = async (path: string) => {};
}
