import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { Tabs2, Tab2, Colors } from "@blueprintjs/core";
import { SideBarCard } from ".../view";
import { Endpoint } from ".../constants";
import { style, classes } from "typestyle";

export const InstanceSelectionCard = ReactiveComponent(
  ({}, { selectedEndpoint, setEndpoint, getEndpointTitle, isEndpointUp }) => {
    return (
      <SideBarCard title="Server Instance">
        <Tabs2
          id="menu"
          vertical
          selectedTabId={selectedEndpoint}
          onChange={setEndpoint}
        >
          {Object.keys(Endpoint).map(key => {
            return (
              <Tab2
                key={Endpoint[key]}
                id={Endpoint[key]}
                title={getEndpointTitle(Endpoint[key])}
                className={getTabClassName(isEndpointUp(Endpoint[key]))}
              />
            );
          })}
        </Tabs2>
      </SideBarCard>
    );
  }
);

function getTabClassName(statusUp: boolean) {
  return classes(
    `pt-icon-record`,
    style({
      $nest: {
        "&:before": {
          marginRight: "10px",
          color: statusUp ? Colors.GREEN5 : Colors.RED5
        }
      }
    })
  );
}
