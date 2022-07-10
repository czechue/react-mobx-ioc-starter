import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { HttpGateway } from "../../Core/Http/HttpGateway";
import { Types } from "../../Core/Types";

type DraftDm = any;

@injectable()
export class DraftRepository {
  draftUrl = "/draft";

  @inject(Types.IHttpGateway)
  dataGateway!: HttpGateway;

  draftDm: DraftDm;

  constructor() {
    makeObservable(this, {
      draftDm: observable,
      submitDraft: action,
    });
  }

  submitDraft = async () => {
    // const draftDto = { draftId: this.draftDm };
    // const draftDto = {
    //  ...
    // }
    // await this.dataGateway.post(this.draftUrl, draftDto);
  };
}
