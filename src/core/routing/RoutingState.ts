import { injectable } from "inversify";
import { makeObservable, observable } from "mobx";

type CurrentState = {
  routeId: string | null;
  params: string | null;
  query: string | null;
};

@injectable()
export class RoutingState {
  currentState: CurrentState = {
    routeId: "loginLink",
    params: null,
    query: null,
  };

  constructor() {
    makeObservable(this, { currentState: observable });
  }
}
