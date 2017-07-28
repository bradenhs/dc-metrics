import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { BarChart } from ".../view";
import { NonIdealState, Button } from "@blueprintjs/core";
import { classes, style } from "typestyle";

const chartClassName = style({
  display: "inline-block",
  width: "280px",
  height: "280px",
  marginLeft: "15px",
  marginRight: "15px",
  marginTop: "-20px",
  float: "left"
});
0;

const clearCacheButtonClassName = classes(
  "pt-small",
  style({
    position: "absolute",
    top: "-22px",
    right: "0"
  })
);

const containerClassName = style({
  position: "relative"
});

export const CacheVis = ReactiveComponent(({}, store) => {
  if (!store.selectedSnapshotCollection.latestSnapshot) {
    return null;
  }
  const snaps =
    store.selectedSnapshotCollection.latestSnapshot.cacheHitMissData;
  return (
    <div className={containerClassName}>
      <Button
        text={`Clear ${store.currentEndpointTitle} caches`}
        className={clearCacheButtonClassName}
        onClick={store.clearCurrentEndpointCache}
      />
      {snaps.map(snap => {
        return (
          <div key={snap.cacheName} className={chartClassName}>
            {snap.data.every(d => d.value === 0)
              ? <NonIdealState
                  title="No Data"
                  visual="timeline-bar-chart"
                  className={style({ marginTop: "4px" })}
                />
              : <BarChart
                  data={snap.data}
                  valueLabel={d => Math.round(d.y * 100) + "%"}
                  dimensions={{
                    height: 250,
                    width: 250
                  }}
                />}
            <div style={{ textAlign: "center" }}>
              <div>
                <b>
                  {snap.cacheName}
                </b>
              </div>
              {snap.size} object{snap.size !== 1 && "s"} in cache
            </div>
          </div>
        );
      })}
    </div>
  );
});
