// Polyfill Promise and fetch globally
import * as es6Promise from "es6-promise";
es6Promise.polyfill();
import "isomorphic-fetch";

import { normalize } from "csstips";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import { App } from "~/view";
import { memory } from "~/controller";
import { Store } from "~/model";
import { cssRaw } from "typestyle";
import { StoreProvider } from "~/utils";

console.log("hello");

// Initial CSS setup
normalize();
cssRaw(`
  body {
    background: #293742;
  }

  * {
    outline: none !important;
  }
`);

// Allows us to capture touch tap events
injectTapEventPlugin();

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
memory.startPolling(store.memoryCollection);

// const EntityMixin = base =>
//   class EntityMixin extends base {
//     id: string;
//   };

// const NameMixin = base =>
//   class NameMixin extends base {
//     name: string;
//   }

// class Child extends mix(EntityMixin, NameMixin) {
//   hi() {}
// }

// function mix<A, B>(a: A, b: B): typeof (A & B)
// function mix(...mixins: any[]) {
//   return mixins.reduce((mixin, reducedMixin) => {
//     return mixin(reducedMixin)
//   }, class { })
// }
