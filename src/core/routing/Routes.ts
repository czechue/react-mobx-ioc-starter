import { injectable } from "inversify";

type Route = {
  routeId: string;
  routeDef: {
    path: string;
    isSecure: boolean;
  };
  onEnter?: () => void;
  onLeave?: () => void;
};

@injectable()
export class Routes {
  routes: Route[] = [
    {
      routeId: "rootLink",
      routeDef: {
        path: "/",
        isSecure: false,
      },
    },
    {
      routeId: "homeLink",
      routeDef: {
        path: "/home",
        isSecure: false,
      },
      onEnter: () => {
        console.log("onEnter");
      },
      onLeave: () => {
        console.log("onLeave");
      },
    },
    {
      routeId: "faqLink",
      routeDef: {
        path: "/faq",
        isSecure: false,
      },
      onEnter: () => {
        console.log("onEnter faq");
      },
      onLeave: () => {
        console.log("onLeave faq");
      },
    },
    {
      routeId: "BotLink",
      routeDef: {
        path: "/bot",
        isSecure: false,
      },
    },
  ];
}
