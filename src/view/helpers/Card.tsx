import * as React from "react";
import { ReactiveComponent } from "~/utils";
import { style, classes } from "typestyle";

interface Props {
  title: string;
  children?: React.ReactNode;
}

const cardClassName = classes(
  style({
    margin: "10px",
    width: "500px",
    height: "500px",
    overflow: "hidden",
    float: "left",
    display: "block"
  }),
  "pt-card",
  "pt-elevation-2",
  "pt-interactive"
);

export const Card = ReactiveComponent(({ title, children }: Props) => {
  return (
    <div className={cardClassName}>
      <h5>
        {title}
      </h5>
      {children}
    </div>
  );
});
