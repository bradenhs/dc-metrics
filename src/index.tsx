// Polyfill Promise and fetch globally
import * as es6Promise from "es6-promise";
es6Promise.polyfill();
import "isomorphic-fetch";

import { normalize } from "csstips";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "~/view";
import { Store } from "~/store";
import { style } from "typestyle";
import { StoreProvider } from "~/utils";

// Initial CSS setup
normalize();
document.body.className = style({
  background: "#293742",
  $nest: {
    "&>*": {
      outline: "none !important"
    }
  }
});

// Initialize our store
const store = new Store();

// Create a container the application and render our app into it
const appContainer = document.createElement("div");
document.body.appendChild(appContainer);
ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  appContainer
);

// Intiate the polling
store.startPolling();
