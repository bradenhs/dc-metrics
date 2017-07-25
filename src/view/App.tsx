import * as React from "react";
import { ReactiveComponent } from "~/utils";
import { Menu } from "~/view";
import { style } from "typestyle";

const appClassName = style({
  padding: "40px",
  minWidth: "1200px"
});

export const App = ReactiveComponent(() => {
  return (
    <div className={appClassName}>
      <Menu />
    </div>
  );
});
