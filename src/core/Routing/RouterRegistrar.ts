import { inject, injectable } from "inversify";

import { Routes } from "./Routes";
import { RouteUpdater } from "./RouteUpdater";

@injectable()
export class RouteRegistrar {
  @inject(RouteUpdater)
  routeUpdater!: RouteUpdater;

  extractRoutes = (routes: Routes["routes"]) => {
    const routeConfig: Record<string, unknown> = {};
    routes.forEach((route) => {
      const def = this.routeUpdater.findRoute(route.routeId);
      routeConfig[def.routeDef.path] = async (
        params: string,
        query: string
      ) => {
        this.routeUpdater.updateCurrentRoute(def.routeId, params, query);
      };
    });
    return routeConfig;
  };
}
