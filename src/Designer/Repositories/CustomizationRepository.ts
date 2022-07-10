import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";

import { HttpGateway } from "../../Core/Http/HttpGateway";
import { Types } from "../../Core/Types";

type CustomizationDm = any;

@injectable()
export class CustomizationRepository {
  customizationUrl = "/customization";

  @inject(Types.IHttpGateway)
  dataGateway!: HttpGateway;

  customizationDm: CustomizationDm;

  constructor() {
    makeObservable(this, {
      customizationDm: observable,
    });
  }
}
