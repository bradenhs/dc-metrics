import * as React from "react";
import { ReactiveComponent } from "~/utils";
import * as V from "victory";

export const App = ReactiveComponent(({}, { ui, snapshotCollection }) => {
  return (
    <div>
      <V.VictoryChart
        animate={{ duration: 450 }}
        domain={snapshotCollection.domain}
        padding={0}
        height={ui.windowHeight}
        width={ui.windowWidth}
      >
        <V.VictoryArea
          style={{ data: { opacity: 0.5, fill: "#239912" } }}
          data={snapshotCollection.loadedSnapshots}
          x="time"
          y="memoryFree"
        />
        <V.VictoryScatter
          style={{ data: { fill: "#ffffff" } }}
          data={snapshotCollection.loadedSnapshots}
          x="time"
          y="memoryFree"
        />
      </V.VictoryChart>
    </div>
  );
});
