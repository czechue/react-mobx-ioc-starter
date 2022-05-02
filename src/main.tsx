import "reflect-metadata";

import { configure } from "mobx";
import React from "react";
import { createRoot } from "react-dom/client";

import { AppComponent } from "./app/AppComponent";
import { container, InjectionProvider } from "./core/DI";

configure({
  enforceActions: "never",
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
  observableRequiresReaction: false,
  disableErrorBoundaries: false,
});

const domContainer = document.getElementById("root");
const root = createRoot(domContainer!);

root.render(
  <React.StrictMode>
    <InjectionProvider container={container}>
      <AppComponent />
    </InjectionProvider>
  </React.StrictMode>
);
