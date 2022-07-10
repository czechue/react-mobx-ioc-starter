import { inject, injectable } from "inversify";
import { action, computed, makeObservable } from "mobx";
import * as TreeModel from "tree-model";

import { AuthenticationRepository } from "../Authentication/AuthenticationRepository";
import { Router } from "../Routing/Router";

let tree = new TreeModel();

@injectable()
export class NavigationRepository {
  @inject(AuthenticationRepository)
  authenticationRepository!: AuthenticationRepository;

  @inject(Router)
  router!: Router;

  get currentNode() {
    var self = this;
    return this.getTree().all(function (node) {
      return node.model.id === self.router.currentRoute.routeId;
    })[0];
  }

  constructor() {
    makeObservable(this, {
      currentNode: computed,
      back: action,
    });
  }

  getTree() {
    return tree.parse({
      id: "homeLink",
      type: "root",
      text: "Home",
      children: [
        {
          id: "designerLink",
          type: "link",
          text: "Designer",
        },
        {
          id: "booksLink",
          type: "link",
          text: "Books",
        },
        {
          id: "authorsLink",
          type: "link",
          text: "Authors",
          children: [
            {
              id: "authorsLink-authorPolicyLink",
              type: "link",
              text: "Author Policy",
            },
            {
              id: "authorsLink-mapLink",
              type: "link",
              text: "View Map",
            },
          ],
        },
      ],
    });
  }

  back = async () => {
    let currentNode = this.currentNode;
    await this.router.goToId(currentNode.parent.model.id);
  };
}
