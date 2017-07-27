// Polyfill Promise and fetch globally
import * as es6Promise from "es6-promise";
es6Promise.polyfill();
import "isomorphic-fetch";

import { normalize } from "csstips";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "~/view";
import { Store } from "~/store";
import { style, forceRenderStyles } from "typestyle";
import { StoreProvider } from "~/utils";
import { startRouter } from "~/services";
import { useStrict } from "mobx";
import { Colors } from "@blueprintjs/core";

useStrict(true);

// Initial CSS setup
normalize();
document.body.classList.add(
  style({
    background: Colors.DARK_GRAY3,
    $nest: {
      "*": {
        outline: "none !important",
        userSelect: "none"
      }
    }
  })
);

document.body.classList.add("pt-dark");

// Initialize our store
const store = new Store();

// Setup routing
startRouter(store);

// Create a container the application and render our app into it
const appContainer = document.createElement("div");
document.body.appendChild(appContainer);
ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  appContainer
);

forceRenderStyles();

// Intiate the polling
store.startPolling();
