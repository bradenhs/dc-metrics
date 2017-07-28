import { ReactiveComponent } from ".../utils";
import * as React from "react";
import { BarChart } from ".../view";

export const HeapVis = ReactiveComponent(({}, store) => {
  return (
    <div>
      {store.selectedSnapshotCollection.latestSnapshot &&
        <BarChart
          data={store.selectedSnapshotCollection.latestSnapshot.heapData}
          valueLabel={d => Math.floor(d.y / 1000) + "MB"}
          dimensions={{
            height: 250,
            width: 800
          }}
        />}
    </div>
  );
});
