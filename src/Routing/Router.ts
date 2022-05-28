import { inject, injectable } from "inversify";
import { computed, makeObservable } from "mobx";

import { Types } from "../Core/Types";
import { RouterGateway } from "./RouterGateway";
import { RouteRegistrar } from "./RouterRegistrar";
import { Routes } from "./Routes";
import { RouteUpdater } from "./RouteUpdater";
import { RoutingState } from "./RoutingState";

@injectable()
export class Router {
  @inject(RouteRegistrar)
  routeRegistrar!: RouteRegistrar;

  @inject(RouteUpdater)
  routeUpdater!: RouteUpdater;

  @inject(Routes)
  routes!: Routes;

  @inject(Types.IRouterGateway)
  routerGateway!: RouterGateway;

  @inject(RoutingState)
  routingState!: RoutingState;

  constructor() {
    makeObservable(this, {
      currentRouteId: computed,
    });
  }

  get currentRouteId() {
    return this.routingState.currentState.routeId;
  }

  registerRoutes = () => {
    let routeConfig: any = this.routeRegistrar.extractRoutes(
      this.routes.routes
    );
    this.routerGateway.registerRoutes(routeConfig);
  };

  goToId = async (routeId: string, params?: string, query?: string) => {
    let routePath = this.routeUpdater.findRoute(routeId).routeDef.path;

    if (query) {
      routePath = routePath + "?" + query;
    }

    await this.routerGateway.goToPath(routePath);
  };
}
