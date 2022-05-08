import "reflect-metadata";
import "./core/styles/css-vars.css";

import { configure } from "mobx";
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";

import { AppComponent } from "./app/AppComponent";
import { container, InjectionProvider } from "./core/di";
import { theme } from "./core/styles/theme";

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
      <ThemeProvider theme={theme}>
        <AppComponent />
      </ThemeProvider>
    </InjectionProvider>
  </React.StrictMode>
);
