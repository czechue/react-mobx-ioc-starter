import { inject, injectable } from "inversify";
import { computed, makeObservable } from "mobx";

import { MessagesRepository } from "./Core/Messages/MessagesRepository";
import { NavigationPresenter } from "./Navigation/NavigationPresenter";
import { Router } from "./Routing/Router";

@injectable()
export class AppPresenter {
  @inject(Router)
  router!: Router;

  @inject(MessagesRepository)
  messagesRepository!: MessagesRepository;

  @inject(NavigationPresenter)
  navigationPresenter!: NavigationPresenter;

  get currentRoute() {
    return this.router.currentRoute;
  }

  get currentSelectedVisibleName() {
    return this.navigationPresenter.viewModel.currentSelectedVisibleName;
  }

  constructor() {
    makeObservable(this, {
      currentRoute: computed,
    });
  }

  load = (onRouteChange: any) => {
    const onRouteChangeWrapper = () => {
      this.messagesRepository.appMessages = [];
      onRouteChange();
    };
    this.router.registerRoutes(onRouteChangeWrapper);
  };
}
