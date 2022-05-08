import { inject, injectable } from "inversify";
import { action, makeObservable } from "mobx";

import { Routes } from "./Routes";
import { RoutingState } from "./RoutingState";

@injectable()
export class RouteUpdater {
  @inject(RoutingState)
  routingState!: RoutingState;

  @inject(Routes)
  routes!: Routes;

  constructor() {
    makeObservable(this, {
      updateCurrentRoute: action,
      updateRouteDetails: action,
    });
  }

  // AUTHENTICATION CODE
  // public canView = (routeId: string): boolean => {
  //   const targetRoute = this.routes.find(route => route.routeId === routeId)
  //   if (!targetRoute) return false
  //   if (!targetRoute.routeDef.permissionId) return true
  //   return this.authenticationRepository.canView(targetRoute.routeDef.permissionId)
  // }

  updateCurrentRoute = async (
    routeId: string,
    params: string,
    query: string
  ) => {
    // AUTHENTICATION CODE
    // if (!this.canView(routeId)) {
    //   this.logoutUser()
    //   return
    // }

    const oldRouteId = this.routingState.currentState.routeId;
    const routeChanged = oldRouteId !== routeId;
    const route = this.findRoute(routeId);
    const targetRouteId = route.routeId;

    console.log("old route is ", oldRouteId);
    console.log("new route is ", targetRouteId);

    if (routeChanged && oldRouteId && route && route.onLeave) {
      route.onLeave();
    }

    if (routeChanged && route && route.onEnter) {
      route.onEnter();
    }

    this.updateRouteDetails(targetRouteId, params, query);
  };

  findRoute(routeId: string) {
    const route = this.routes.routes.find((route) => {
      return route.routeId === routeId;
    });
    return (
      route || {
        routeId: "loadingSpinner",
        routeDef: { path: "" },
        onEnter: null,
        onLeave: null,
      }
    );
  }

  updateRouteDetails = (routeId: string, params: string, query: string) => {
    console.log("updating route");
    this.routingState.currentState.routeId = routeId;
    this.routingState.currentState.params = params;
    this.routingState.currentState.query = query;
  };
}
