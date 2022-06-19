import { injectable } from "inversify";
import Navigo, { Handler } from "navigo";

export type RouteConfig = Record<string, { as: string; uses: Handler }>;

@injectable()
export class RouterGateway {
  navigo!: Navigo;

  registerRoutes = async (routeConfig: RouteConfig) => {
    console.log();
    if (this.navigo) return new Promise((resolve) => setTimeout(resolve, 0));

    this.navigo = new Navigo("/", { hash: false });
    this.navigo
      .on(routeConfig)
      .notFound(() => {})
      .resolve();
    return new Promise((resolve) => setTimeout(resolve, 0));
  };

  unload = () => {
    this.navigo.destroy();
  };

  goToId = async (name: string, queryString: string) => {
    this.navigo.navigateByName(name, queryString);
  };
}
