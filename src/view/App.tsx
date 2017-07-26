import * as React from "react";
import { ReactiveComponent } from "~/utils";
import { flex, horizontal, content, width } from "csstips";
import { Menu, Visualizations, RawView } from "~/view";
import { style } from "typestyle";

const appClassName = style(
  {
    padding: "40px",
    minWidth: "1200px"
  },
  flex,
  horizontal
);

const leftColumnClassName = style(content, width(200));

const rightColumnClassName = style(flex, {
  marginLeft: "30px",
  marginTop: "43px"
});

export const App = ReactiveComponent(() => {
  return (
    <div className={appClassName}>
      <Menu className={leftColumnClassName} />
      <div className={rightColumnClassName}>
        <RawView />
        <Visualizations />
      </div>
    </div>
  );
});
