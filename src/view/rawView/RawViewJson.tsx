import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { important } from "csx";
import { style } from "typestyle";
import ReactJson from "react-json-view";

const rawJsonViewClassName = style({
  overflowY: "scroll",
  height: "calc(100% - 40px)",
  borderRadius: "4px",
  $nest: {
    ".object-key-val > span:first-child > span:first-child": {
      display: "none",
      pointerEvents: "none"
    },
    ".icon-container": {
      display: important("none")
    }
  }
});

export const RawViewJson = ReactiveComponent(
  ({}, { viewRaw, selectedSnapshotCollection, selectedEndpoint }) => {
    return (
      <div className={rawJsonViewClassName}>
        <ReactJson
          theme="eighties"
          style={{
            padding: "20px",
            background: "rgba(16, 22, 26, 0.3)",
            boxShadow: "inset 0 0 0 1px rgba(16, 22, 26, 0.4)"
          }}
          name={selectedEndpoint}
          src={
            (viewRaw &&
              selectedSnapshotCollection.latestSnapshot &&
              selectedSnapshotCollection.latestSnapshot.sortedRaw) ||
            {}
          }
        />
      </div>
    );
  }
);
