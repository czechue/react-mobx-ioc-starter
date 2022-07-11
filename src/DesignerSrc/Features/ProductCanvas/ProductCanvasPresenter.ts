import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import DesignerLibrary, {
  controllers,
  extensions,
} from "../../../libs/designer-lib/lib/index";
import customizations from "./__fixtures__/customizations";

const productExtensions = {
  validator: extensions.validator,
  blueprint: extensions.blueprint,
  cropLines: extensions.cropLines,
  bleedArea: extensions.bleedArea,
  printArea: extensions.printArea,
  resizer: extensions.resizer,
  sizeLabel: extensions.sizeLabel,
  keyboardShortcuts: extensions.keyboardShortcuts,
  selection: extensions.selection,
};

@injectable()
export class ProductCanvasPresenter {
  htmlElementReference!: HTMLDivElement;

  designerInstance!: DesignerLibrary;

  constructor() {
    makeObservable(this, {
      htmlElementReference: observable,
      designerInstance: observable,
      initCanvas: action,
    });
  }

  initCanvas(htmlRef: HTMLDivElement) {
    const designerInstance = new DesignerLibrary(this.htmlElementReference);
    this.htmlElementReference = htmlRef;

    void designerInstance
      .mount(productExtensions)
      .then(async (parameters) => {
        const resolver = await controllers.product(customizations[0]);

        resolver(parameters);
      })
      .then(() => {
        this.designerInstance = designerInstance;
      });
  }

  action = () => {
    this.designerInstance.validate();
  };
}
