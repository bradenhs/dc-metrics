import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { SideBarCard } from ".../view";
import { Button } from "@blueprintjs/core";
import { style } from "typestyle";

const bottomSpacingClassName = style({
  marginBottom: "10px"
});

export const DetailsCard = ReactiveComponent(
  ({}, { openDetailsView, currentEndpointDown }) => {
    return (
      <SideBarCard title="Details">
        <Button
          text="Environment Variables"
          onClick={() => openDetailsView("manage/env")}
          className={bottomSpacingClassName}
          disabled={currentEndpointDown}
        />
        <Button
          text="Request Mappings"
          onClick={() => openDetailsView("manage/mappings")}
          className={bottomSpacingClassName}
          disabled={currentEndpointDown}
        />
        <Button
          text="Thread Dump"
          onClick={() => openDetailsView("manage/dump")}
          disabled={currentEndpointDown}
        />
      </SideBarCard>
    );
  }
);
