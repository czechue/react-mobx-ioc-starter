import { inject, injectable } from "inversify";
import { computed, makeObservable } from "mobx";

import { RouterRepository } from "../Routing/RouterRepository";
import { NavigationRepository } from "./NavigationRepository";

@injectable()
export class NavigationPresenter {
  @inject(NavigationRepository)
  navigationRepository!: NavigationRepository;

  @inject(RouterRepository)
  routerRepository!: RouterRepository;

  get viewModel() {
    const vm = {
      showBack: false,
      currentSelectedVisibleName: "",
      currentSelectedBackTarget: { visible: false, id: null },
      menuItems: [],
    };

    let currentNode = this.navigationRepository.currentNode;

    if (currentNode) {
      vm.currentSelectedVisibleName = this.visibleName(currentNode);
      vm.menuItems = currentNode.children.map((node: any) => {
        return { id: node.model.id, visibleName: node.model.text };
      });

      if (currentNode.parent) {
        vm.currentSelectedBackTarget = {
          visible: true,
          id: currentNode.parent.model.id,
        };

        vm.showBack = true;
      }
    }

    return vm;
  }

  constructor() {
    makeObservable(this, {
      viewModel: computed,
    });
  }

  visibleName = (node: any) => {
    return node.model.text + " > " + node.model.id;
  };

  back = () => {
    this.navigationRepository.back();
  };
}
