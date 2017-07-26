import * as React from "react";
import { ReactiveComponent } from "~/utils";
import { Endpoint } from "~/constants";
import { Tabs2, Tab2, Checkbox } from "@blueprintjs/core";
import { style } from "typestyle";

interface Props {
  className?: string;
}

const headerClassName = style({
  marginTop: "20px",
  marginLeft: "10px"
});

export const Menu = ReactiveComponent(
  ({ className = "" }: Props, { selectedEndpoint, setEndpoint }) => {
    return (
      <div className={className}>
        <h6 className={headerClassName}>Server Instance</h6>
        <div className="pt-card">
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
        <h6 className={headerClassName}>Visualizations</h6>
        <div className="pt-card">
          <Checkbox checked={false} label="Cache" />
          <Checkbox checked={true} label="Heap" />
          <Checkbox checked={false} label="Status Codes" />
          <Checkbox checked={false} label="Memory" />
          <Checkbox checked={false} label="Cache" />
          <Checkbox checked={true} label="Heap" />
          <Checkbox checked={false} label="Status Codes" />
          <Checkbox checked={false} label="Memory" />
        </div>
      </div>
    );
  }
);
