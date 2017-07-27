import * as React from "react";
import Transition from "react-transition-group/Transition";
import { ReactiveComponent } from "~/utils";
import { style, classes } from "typestyle";

const TRANSITION_TIME = 450;

interface Props {
  delay?: number;
}

const baseClassName = style({
  transition: `all ease-out ${TRANSITION_TIME}ms`
});

const transitionClassNames = {
  entering: style({
    opacity: 0,
    transform: "translateY(20px)"
  }),
  entered: style({
    opacity: 1,
    transform: "translateY(0px)"
  })
};

export const EnterTransition = ReactiveComponent<
  Props
>(({ delay = 0, children }) => {
  return (
    <Transition in appear timeout={TRANSITION_TIME + delay}>
      {state =>
        <div
          className={classes(baseClassName, transitionClassNames[state])}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {children}
        </div>}
    </Transition>
  );
});
