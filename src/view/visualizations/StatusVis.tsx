import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { style } from "typestyle";
import * as V from "victory";
import { Colors } from "@blueprintjs/core";

const chartClassName = style({
  width: "100%",
  height: "320px"
});

export const StatusVis = ReactiveComponent(
  ({}, { selectedSnapshotCollection }) => {
    if (!selectedSnapshotCollection.latestSnapshot) {
      return null;
    }
    return (
      <div className={chartClassName}>
        <V.VictoryStack
          colorScale={[
            Colors.BLUE1,
            Colors.BLUE2,
            Colors.BLUE3,
            Colors.BLUE4,
            Colors.BLUE5
          ]}
        >
          <V.VictoryBar labels={["500", "200", "100", "123"]} />
          <V.VictoryBar />
          <V.VictoryBar />
        </V.VictoryStack>
      </div>
    );
  }
);
