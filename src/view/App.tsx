import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { flex, horizontal, content, width } from "csstips";
import {
  SideBar,
  VisualizationsContainer,
  RawView,
  EnterTransition
} from ".../view";
import { style } from "typestyle";

const appClassName = style(
  {
    padding: "40px",
    maxWidth: "1300px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  flex,
  horizontal
);

const leftColumnClassName = style(content, width(200));

const rightColumnClassName = style(flex, {
  marginLeft: "26px",
  marginTop: "25px"
});

export const App = ReactiveComponent(() => {
  return (
    <div className={appClassName}>
      <div className={leftColumnClassName}>
        <SideBar />
      </div>
      <div className={rightColumnClassName}>
        <EnterTransition delay={70}>
          <RawView />
        </EnterTransition>
        <EnterTransition delay={100}>
          <VisualizationsContainer />
        </EnterTransition>
      </div>
    </div>
  );
});
