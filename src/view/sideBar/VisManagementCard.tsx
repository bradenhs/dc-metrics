import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { Checkbox } from "@blueprintjs/core";
import { SideBarCard } from ".../view";

export const VisManagementCard = ReactiveComponent(({}, { visualizations }) => {
  return (
    <SideBarCard title="Visualizations">
      {visualizations.map((v, index) => {
        return (
          <Checkbox
            key={v.name}
            checked={v.visible}
            label={v.name}
            onChange={v.toggleVisiblility}
            style={{
              marginBottom: index === visualizations.length - 1 && "0px"
            }}
          />
        );
      })}
    </SideBarCard>
  );
});
