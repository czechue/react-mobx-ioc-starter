/* eslint-disable */
import { injectable } from "inversify";

@injectable()
export class FakeRouterGateway {
  registerRoutes = async (routeConfig: any) => {};

  unload = () => {};

  goToId = async (routeId: string) => {};
}
