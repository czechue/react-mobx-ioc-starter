import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";

import { Types } from "../Core/Types";
import { RouteConfig, RouterGateway } from "./RouterGateway";

@injectable()
export class RouterRepository {
  currentRoute: any = {
    routeId: null,
    routeDef: null,
    params: null,
    query: null,
  };

  @inject(Types.IRouterGateway)
  routerGateway!: RouterGateway;

  onRouteChanged = null;

  routes = [
    {
      routeId: "rootLink",
      routeDef: {
        path: "/",
        isSecure: false,
      },
      onEnter: () => {},
      onLeave: () => {},
    },
    {
      routeId: "everyLayoutLink",
      routeDef: {
        path: "/every-layout",
        isSecure: false,
      },
      onEnter: () => {},
      onLeave: () => {},
    },
    {
      routeId: "loginLink",
      routeDef: {
        path: "/app/login",
        isSecure: false,
      },
      onEnter: () => {},
      onLeave: () => {},
    },
    {
      routeId: "default",
      routeDef: {
        path: "*",
        isSecure: false,
      },
      onEnter: () => {},
      onLeave: () => {},
    },
  ];

  constructor() {
    makeObservable(this, {
      currentRoute: observable,
    });
  }

  registerRoutes = (updateCurrentRoute: any, onRouteChanged: any) => {
    this.onRouteChanged = onRouteChanged;
    let routeConfig: RouteConfig = {};
    this.routes.forEach((routeArg) => {
      const route = this.findRoute(routeArg.routeId);
      routeConfig[route.routeDef.path] = {
        as: route.routeId,
        uses: (match) => {
          console.log(match);
          return updateCurrentRoute(
            route.routeId,
            route.routeDef,
            {},
            match?.queryString
          );
        },
      };
    });

    this.routerGateway.registerRoutes(routeConfig);
  };

  findRoute(routeId?: string | null) {
    const route = this.routes.find((route) => {
      return route.routeId === routeId;
    });
    return (
      route || {
        routeId: "loadingSpinner",
        routeDef: { path: "", isSecure: false },
        onEnter: null,
        onLeave: null,
      }
    );
  }

  goToId = async (routeId: string, queryString: string) => {
    this.routerGateway.goToId(routeId, queryString);
  };
}
