import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { style, classes } from "typestyle";

const cardClassName = classes(
  "pt-card",
  "pt-elevation-2",
  style({ marginBottom: "20px" })
);

const containerClassName = style({
  height: "300px"
});

interface Props {
  title: string;
}

export const VisualizationCard = ReactiveComponent<
  Props
>(({ title, children }) => {
  return (
    <div className={cardClassName}>
      <h6>
        {title}
      </h6>
      <div className={containerClassName}>
        {children}
      </div>
    </div>
  );
});
