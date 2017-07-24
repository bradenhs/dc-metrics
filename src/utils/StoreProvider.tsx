import * as React from "react";
import { object } from "prop-types";

type Constructor<T> = new (...args: any[]) => T;

export class StoreProvider<T extends Constructor<{}>> extends React.Component<{
  store: T;
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
