import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { CacheVis, HeapVis, StatusVis, VisualizationCard } from ".../view";
import { Visualization } from ".../constants";
import { NonIdealState } from "@blueprintjs/core";
import { style } from "typestyle";

const containerClassName = style({
  marginTop: "26px"
});

const nonIdealStateClassName = style({
  marginTop: "160px"
});

export const VisualizationsContainer = ReactiveComponent(
  ({}, { visibleVisualizations }) => {
    const visualizationMap = {
      [Visualization.CACHE]: <CacheVis />,
      [Visualization.HEAP]: <HeapVis />,
      [Visualization.STATUS]: <StatusVis />
    };

    return (
      <div className={containerClassName}>
        {visibleVisualizations.length === 0 &&
          <NonIdealState
            className={nonIdealStateClassName}
            title="No Visualizations Selected"
            visual="chart"
          />}
        {visibleVisualizations.map(v => {
          return (
            <VisualizationCard title={v.name} key={v.name}>
              {visualizationMap[v.name]}
            </VisualizationCard>
          );
        })}
      </div>
    );
  }
);
