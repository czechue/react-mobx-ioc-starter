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

  // todo: FIX these types
  updateCurrentRoute = async (
    newRouteId: string,
    params: string,
    query: string
  ) => {
    let oldRoute = this.routerRepository.findRoute(this.currentRoute.routeId);
    let newRoute = this.routerRepository.findRoute(newRouteId);
    const hasToken = !!this.userModel.token;
    const routeChanged = oldRoute.routeId !== newRoute.routeId;
    const protectedOrUnauthenticatedRoute =
      (newRoute.routeDef.isSecure && !hasToken) ||
      newRoute.routeDef.path === "*";
    const publicOrAuthenticatedRoute =
      (newRoute.routeDef.isSecure && hasToken) || !newRoute.routeDef.isSecure;

    if (routeChanged) {
      this.routerRepository.onRouteChanged();

      if (protectedOrUnauthenticatedRoute) {
        this.routerRepository.goToId("loginLink", "");
      } else if (publicOrAuthenticatedRoute) {
        if (oldRoute.onLeave) oldRoute.onLeave();
        if (newRoute.onEnter) newRoute.onEnter();

        this.routerRepository.currentRoute.routeId = newRoute.routeId;
        this.routerRepository.currentRoute.routeDef = newRoute.routeDef;
        this.routerRepository.currentRoute.params = params;
        this.routerRepository.currentRoute.query = query;
      }
    }
  };

  registerRoutes = (onRouteChange: () => void) => {
    this.routerRepository.registerRoutes(
      this.updateCurrentRoute,
      onRouteChange
    );
  };

  goToId = async (routeId: string, queryString?: string) => {
    await this.routerRepository.goToId(routeId, queryString);
  };
}
