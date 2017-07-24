import {
  ReactNode,
  ReactElement,
  ValidationMap,
  StatelessComponent
} from "react";
import { observer } from "mobx-react";
import { Store } from "~/store";
import { object } from "prop-types";

interface StatelessReactiveComponent<P = {}> {
  (props: P & { children?: ReactNode }, store?: Store): ReactElement<
    any
  > | null;
  propTypes?: ValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

export function ReactiveComponent<P>(
  reactiveComponent: StatelessReactiveComponent<P>
) {
  if (reactiveComponent.length === 1) {
    return observer<P>(reactiveComponent);
  }

  if (reactiveComponent.length === 2) {
    const ContextMapper: StatelessComponent = (props: P, { store }) => {
      return reactiveComponent(props, store);
    };

    ContextMapper.contextTypes = {
      store: object
    };

    return observer<P>(ContextMapper);
  }

  throw new Error(
    "Component provided should have only one or two expected arguments"
  );
}
