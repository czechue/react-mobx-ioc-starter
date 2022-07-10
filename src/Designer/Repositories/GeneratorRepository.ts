import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";

import { HttpGateway } from "../../Core/Http/HttpGateway";
import { Types } from "../../Core/Types";

type GeneratorDm = any;

@injectable()
export class GeneratorRepository {
  generatorUrl = "/generator";

  @inject(Types.IHttpGateway)
  dataGateway!: HttpGateway;

  generatorDm: GeneratorDm;

  constructor() {
    makeObservable(this, {
      generatorDm: observable,
    });
  }
}
