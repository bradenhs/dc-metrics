import * as React from "react";
import { object } from "prop-types";
import { Store } from ".../store";

export class StoreProvider extends React.Component<{
  store: Store;
}> {
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

  static childContextTypes = {
    store: object
  };
}
