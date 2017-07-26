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
import { StoreProvider, urlSync } from "~/utils";
import { useStrict } from "mobx";
import { Endpoint } from "~/constants";
import { Colors } from "@blueprintjs/core";

useStrict(true);

// Initial CSS setup
normalize();
document.body.classList.add(
  style({
    background: Colors.DARK_GRAY3,
    $nest: {
      "&>*": {
        outline: "none !important"
      }
    }
  })
);

document.body.classList.add("pt-dark");

// Initialize our store
const store = new Store();

// Setup routing
urlSync({
  toState(url) {
    const endpoint = {
      "/dev": Endpoint.DEV,
      "/qa": Endpoint.QA,
      "/preprod": Endpoint.PREPROD
    }[url.pathname];
    if (endpoint == null) {
      store.set404(true);
    } else {
      store.set404(false);
      store.setEndpoint(endpoint);
    }
  },
  toUrlPath() {
    const urlFriendlyEndpoint = {
      [Endpoint.DEV]: "dev",
      [Endpoint.QA]: "qa",
      [Endpoint.PREPROD]: "preprod"
    }[store.selectedEndpoint];
    return `/${urlFriendlyEndpoint}`;
  }
});

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
