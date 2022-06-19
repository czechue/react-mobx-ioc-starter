import { inject, injectable } from "inversify";
import { action, computed, makeObservable } from "mobx";

import { UserModel } from "../Authentication/UserModel";
import { MessagesRepository } from "../Core/Messages/MessagesRepository";
import { RouterRepository } from "./RouterRepository";

@injectable()
export class Router {
  @inject(RouterRepository)
  routerRepository!: RouterRepository;

  @inject(UserModel)
  userModel!: UserModel;

  @inject(MessagesRepository)
  messagesRepository!: MessagesRepository;

  get currentRoute() {
    return this.routerRepository.currentRoute;
  }

  constructor() {
    makeObservable(this, {
      currentRoute: computed,
      updateCurrentRoute: action,
    });
  }

  // @ts-ignore
  updateCurrentRoute = async (newRouteId, params, query) => {
    let oldRoute = this.routerRepository.findRoute(this.currentRoute.routeId);
    let newRoute = this.routerRepository.findRoute(newRouteId);
    const hasToken = !!this.userModel.token;
    const routeChanged = oldRoute.routeId !== newRoute.routeId;
    const protectedOrUnauthenticatedRoute =
      // @ts-ignore
      (newRoute.routeDef.isSecure && hasToken === false) ||
      newRoute.routeDef.path === "*";
    const publicOrAuthenticatedRoute =
      // @ts-ignore
      (newRoute.routeDef.isSecure && hasToken === true) ||
      // @ts-ignore
      newRoute.routeDef.isSecure === false;

    if (routeChanged) {
      this.routerRepository.onRouteChanged();

      if (protectedOrUnauthenticatedRoute) {
        this.routerRepository.goToId("loginLink");
      } else if (publicOrAuthenticatedRoute) {
        // @ts-ignore
        if (oldRoute.onLeave) oldRoute.onLeave();
        // @ts-ignore
        if (newRoute.onEnter) newRoute.onEnter();
        this.routerRepository.currentRoute.routeId = newRoute.routeId;
        // @ts-ignore
        this.routerRepository.currentRoute.routeDef = newRoute.routeDef;
        this.routerRepository.currentRoute.params = params;
        this.routerRepository.currentRoute.query = query;
      }
    }
  };

  // @ts-ignore
  registerRoutes = (onRouteChange) => {
    this.routerRepository.registerRoutes(
      this.updateCurrentRoute,
      onRouteChange
    );
  };

  // @ts-ignore
  goToId = async (routeId) => {
    this.routerRepository.goToId(routeId);
  };
}
