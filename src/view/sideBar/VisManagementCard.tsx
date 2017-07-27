import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { Checkbox } from "@blueprintjs/core";
import { SideBarCard } from ".../view";

export const VisManagementCard = ReactiveComponent(() => {
  return (
    <SideBarCard title="Visualizations">
      <Checkbox checked={false} label="Cache" />
      <Checkbox checked={true} label="Heap" />
      <Checkbox checked={false} label="Status Codes" />
      <Checkbox checked={false} label="Memory" />
      <Checkbox checked={false} label="Cache" />
      <Checkbox checked={true} label="Heap" />
      <Checkbox checked={false} label="Status Codes" />
      <Checkbox checked={false} label="Memory" />
    </SideBarCard>
  );
});
