import { injectable } from "inversify";
import Navigo, { Handler } from "navigo";

export type RouteConfig = Record<string, { as: string; uses: Handler }>;

@injectable()
export class RouterGateway {
  private navigo!: Navigo;

  // @ts-ignore
  registerRoutes = async (routeConfig) => {
    if (this.navigo) return new Promise((resolve) => setTimeout(resolve, 0));
    this.navigo = new Navigo("/");
    let self = this.navigo;
    self
      .on(routeConfig)
      .notFound(() => {})
      .resolve();

    return new Promise((resolve) => setTimeout(resolve, 0));
  };

  unload = () => {
    this.navigo.destroy();
  };

  // @ts-ignore
  goToId = async (name, queryString) => {
    this.navigo.navigateByName(name, queryString);
  };
}
