import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { Tabs2, Tab2 } from "@blueprintjs/core";
import { SideBarCard } from ".../view";
import { Endpoint } from ".../constants";

export const InstanceSelectionCard = ReactiveComponent(
  ({}, { selectedEndpoint, setEndpoint }) => {
    return (
      <SideBarCard title="Server Instance">
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
      </SideBarCard>
    );
  }
);
