// Polyfill Promise and fetch globally
import * as es6Promise from "es6-promise";
es6Promise.polyfill();
import "isomorphic-fetch";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from ".../view";
import { Store } from ".../store";
import { StoreProvider } from ".../utils";
import { startRouter, setupStyling } from ".../services";
import { useStrict } from "mobx";

useStrict(true);

// CSS stuff
setupStyling();

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

// Intiate the polling
store.startPolling();
