import { ReactiveComponent } from ".../utils";
import * as React from "react";
import * as V from "victory";
import { Colors } from "@blueprintjs/core";

export const HeapVis = ReactiveComponent(({}, store) => {
  return (
    <div>
      {store.selectedSnapshotCollection.latestSnapshot &&
        <V.VictoryChart domainPadding={50} width={800} height={300} style={{}}>
          <V.VictoryBar
            style={{
              data: {
                fill: Colors.BLUE5
              },
              labels: {
                fill: Colors.GRAY4
              }
            }}
            animate={{
              duration: 500,
              onEnter: {
                duration: 0
              }
            }}
            data={store.selectedSnapshotCollection.latestSnapshot.heapData}
            categories={
              {
                x: ["Heap", "Heap Committed", "Heap Init", "Heap Used"]
              } as any
            }
            labels={d => Math.floor(d.y / 1000) + "MB"}
            labelComponent={<V.VictoryLabel />}
          />
          <V.VictoryAxis
            style={{
              axis: {
                stroke: Colors.GRAY4
              },
              tickLabels: {
                fill: Colors.GRAY4
              }
            }}
          />
        </V.VictoryChart>}
    </div>
  );
});
