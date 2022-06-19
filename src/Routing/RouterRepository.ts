import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";

import { Types } from "../Core/Types";
import { RouterGateway } from "./RouterGateway";

@injectable()
export class RouterRepository {
  currentRoute = {
    routeId: "",
    routeDef: {
      path: "",
      isSecure: false,
    },
    params: "",
    query: "",
  };

  @inject(Types.IRouterGateway)
  routerGateway!: RouterGateway;

  onRouteChanged = () => console.log("route changed");

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

  // @ts-ignore
  registerRoutes = (updateCurrentRoute, onRouteChanged) => {
    this.onRouteChanged = onRouteChanged;
    let routeConfig = {};
    this.routes.forEach((routeArg) => {
      const route = this.findRoute(routeArg.routeId);
      // @ts-ignore
      routeConfig[route.routeDef.path] = {
        as: route.routeId,
        uses: (match: { queryString: any }) => {
          updateCurrentRoute(
            route.routeId,
            route.routeDef,
            {},
            match.queryString
          );
        },
      };
    });

    this.routerGateway.registerRoutes(routeConfig);
  };

  // @ts-ignore
  findRoute(routeId) {
    const route = this.routes.find((route) => {
      return route.routeId === routeId;
    });
    return route || { routeId: "loadingSpinner", routeDef: { path: "" } };
  }

  // @ts-ignore
  goToId = async (routeId) => {
    this.routerGateway.goToId(routeId, "");
  };
}
