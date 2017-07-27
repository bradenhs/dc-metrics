import * as React from "react";
import { ReactiveComponent } from "~/utils";
import { Endpoint } from "~/constants";
import { Tabs2, Tab2, Checkbox, Button } from "@blueprintjs/core";
import { style, classes } from "typestyle";
import { EnterTransition } from "~/view";

interface Props {
  className?: string;
}

const headerClassName = style({
  marginLeft: "10px"
});

const spacer = style({
  marginBottom: "20px"
});

export const Menu = ReactiveComponent(
  (
    { className = "" }: Props,
    { selectedEndpoint, setEndpoint, shareCurrentView }
  ) => {
    return (
      <div className={className}>
        <EnterTransition>
          <h6 className={headerClassName}>Server Instance</h6>
          <div className={classes(spacer, "pt-card")}>
            <Tabs2
              id="menu"
              vertical
              selectedTabId={selectedEndpoint}
              onChange={setEndpoint}
            >
              <Tab2 id={Endpoint.DEV} title="Development" />
              <Tab2 id={Endpoint.QA} title="QA" />
              <Tab2 id={Endpoint.PREPROD} title="Pre-Production" />
            </Tabs2>
          </div>
        </EnterTransition>
        <EnterTransition delay={30}>
          <h6 className={headerClassName}>Visualizations</h6>
          <div className={classes(spacer, "pt-card")}>
            <Checkbox checked={false} label="Cache" />
            <Checkbox checked={true} label="Heap" />
            <Checkbox checked={false} label="Status Codes" />
            <Checkbox checked={false} label="Memory" />
            <Checkbox checked={false} label="Cache" />
            <Checkbox checked={true} label="Heap" />
            <Checkbox checked={false} label="Status Codes" />
            <Checkbox checked={false} label="Memory" />
          </div>
        </EnterTransition>
        <EnterTransition delay={60}>
          <div className="pt-card">
            <Button
              text="Share Current View"
              className="pt-fill pt-intent-primary"
              onClick={shareCurrentView}
            />
          </div>
        </EnterTransition>
      </div>
    );
  }
);
