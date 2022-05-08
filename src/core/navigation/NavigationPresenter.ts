import { inject, injectable } from "inversify";
import { computed, makeObservable } from "mobx";
import TreeModel from "tree-model";

import { Router } from "../routing/Router";
import { AppNavigationModel, NavigationTree } from "./NavigationTree";

@injectable()
export class NavigationPresenter {
  @inject(NavigationTree)
  navigationTree!: NavigationTree;

  @inject(Router)
  router!: Router;

  constructor() {
    makeObservable(this, {
      currentSelectedNavigationNode: computed,
      currentBackTarget: computed,
      isTop: computed,
    });
  }

  get currentSelectedNavigationNode() {
    if (!this.findCurrentNode()) {
      return undefined;
    }

    return this.findCurrentNode()["model"].id;
  }

  get currentBackTarget() {
    if (!this.findCurrentNode()) {
      return undefined;
    }

    if (this.findCurrentNode()["parent"]) {
      return {
        enabled: true,
        target: this.findCurrentNode()["parent"]["model"].id,
      };
    }

    return { enabled: false, target: null };
  }

  get isTop() {
    return !this.findCurrentNode()["parent"];
  }

  viewModel = () => {
    return this.navigationTree.getTree();
  };

  backToTop = () => {
    let parent = this.findCurrentNode();
    do {
      parent = parent["parent"];
    } while (parent["model"].type !== "root");

    this.router.goToId(parent["model"].id);
  };

  findCurrentNode = (): TreeModel.Node<AppNavigationModel> => {
    return this.viewModel().all((node) => {
      return node["model"].id === this.router.currentRouteId;
    })[0];
  };
}
