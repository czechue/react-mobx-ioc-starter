import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";

import { AuthorsRepository } from "../Authors/AuthorsRepository";
import { BooksRepository } from "../Books/BooksRepository";
import { Types } from "../Core/Types";
import { RouterGateway } from "./RouterGateway";

type Route = {
  routeId: string;
  routeDef: {
    path: string;
    isSecure: boolean;
  };
  onEnter?: () => void;
  onLeave?: () => void;
};

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

  @inject(BooksRepository)
  booksRepository!: BooksRepository;

  @inject(AuthorsRepository)
  authorsRepository!: AuthorsRepository;

  onRouteChanged = () => console.log("route changed");

  routes: Route[] = [
    {
      routeId: "loginLink",
      routeDef: {
        path: "/app/login",
        isSecure: false,
      },
      onEnter: undefined,
      onLeave: undefined,
    },
    {
      routeId: "homeLink",
      routeDef: {
        path: "/app/home",
        isSecure: true,
      },
      onEnter: undefined,
      onLeave: undefined,
    },
    {
      routeId: "booksLink",
      routeDef: {
        path: "/app/books",
        isSecure: true,
      },
      onEnter: async () => {
        await this.booksRepository.load();
      },
      onLeave: () => {
        this.booksRepository.reset();
      },
    },
    {
      routeId: "addBooksLink",
      routeDef: {
        path: "/app/books/add",
        isSecure: true,
      },
    },
    {
      routeId: "authorsLink",
      routeDef: {
        path: "/app/authors",
        isSecure: true,
      },
      onEnter: async () => {
        await this.authorsRepository.load();
      },
      onLeave: () => {
        this.booksRepository.reset();
      },
    },
    {
      routeId: "authorsLink-authorPolicyLink",
      routeDef: {
        path: "/app/authors/policy",
        isSecure: false,
      },
    },
    {
      routeId: "authorsLink-mapLink",
      routeDef: {
        path: "/app/authors/map",
        isSecure: false,
      },
    },
    {
      routeId: "everyLayoutLink",
      routeDef: {
        path: "/every-layout",
        isSecure: false,
      },
      onEnter: undefined,
      onLeave: undefined,
    },
    {
      routeId: "default",
      routeDef: {
        path: "*",
        isSecure: false,
      },
      onEnter: undefined,
      onLeave: undefined,
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
    let routeConfig: Record<string, any> = {};
    this.routes.forEach((routeArg) => {
      const route = this.findRoute(routeArg.routeId);

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

  findRoute(routeId: string): Route {
    const route = this.routes.find((route) => {
      return route.routeId === routeId;
    });

    return (
      route || {
        routeId: "loadingSpinner",
        routeDef: { path: "", isSecure: false },
        onLeave: undefined,
        onEnter: undefined,
      }
    );
  }

  goToId = async (routeId: string, queryString?: string) => {
    await this.routerGateway.goToId(routeId, queryString);
  };
}
