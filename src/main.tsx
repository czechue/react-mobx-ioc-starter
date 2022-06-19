import "reflect-metadata";
import "./styles/css-vars.css";

import { configure } from "mobx";
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";

import { AppComponent } from "./AppComponent";
import { container } from "./AppIOC";
import { InjectionProvider } from "./Core/Providers/Injection";
import { ValidationProvider } from "./Core/Providers/Validation";
import { theme } from "./styles/theme";

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
      <ValidationProvider>
        <ThemeProvider theme={theme}>
          <AppComponent />
        </ThemeProvider>
      </ValidationProvider>
    </InjectionProvider>
  </React.StrictMode>
);
