import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { style } from "typestyle";

interface Props {
  title: string;
}

const headerClassName = style({
  marginLeft: "15px"
});

const spacerClassName = style({
  marginBottom: "20px"
});

export const SideBarCard = ReactiveComponent<Props>(({ title, children }) => {
  return (
    <div className={spacerClassName}>
      <h6 className={headerClassName}>
        {title}
      </h6>
      <div className="pt-card">
        {children}
      </div>
    </div>
  );
});
