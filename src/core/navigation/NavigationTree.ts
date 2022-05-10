import "reflect-metadata";

import { injectable } from "inversify";
import TreeModel from "tree-model";

export type AppNavigationModel = {
  id: string;
  type: string;
  text: string;
  dupa?: string;
};

@injectable()
export class NavigationTree {
  getTree() {
    let tree = new TreeModel({ childrenPropertyName: "children" });

    return tree.parse<AppNavigationModel>({
      id: "rootLink",
      type: "root",
      text: "Root Link",
      children: [
        {
          id: "everyLayoutLink",
          type: "link",
          text: "Every Layouts List",
        },
        {
          id: "faqLink",
          type: "link",
          text: "FAQ Link",
        },
      ],
    });
  }
}
