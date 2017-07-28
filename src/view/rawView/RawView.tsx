import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { style, classes, cssRaw } from "typestyle";
import { Button, Overlay } from "@blueprintjs/core";
import { RawViewHeader, RawViewJson } from ".../view";

const endPointClassName = style({
  fontSize: "13px",
  margin: "0 4px"
});

const viewRawClassName = classes(
  style({ float: "right", marginTop: "-2px", marginRight: "-2px" }),
  "pt-small",
  "pt-intent-primary"
);

const cardPadding = 60;

const cardClassName = style({
  position: "fixed",
  left: `${cardPadding}px`,
  top: `${cardPadding}px`,
  right: `${cardPadding}px`,
  bottom: `${cardPadding}px`,
  zIndex: 21
});

cssRaw(`
  .pt-overlay.raw-view-overlay > span {
    transition: all ease 350ms;
    opacity: 0;
  }
  .pt-overlay.raw-view-overlay.pt-overlay-open > span {
    opacity: 1;
  }
`);

export const RawView = ReactiveComponent(({}, store) => {
  return (
    <div>
      <div className="pt-callout pt-intent-primary">
        Polling{" "}
        <code className={endPointClassName}>
          {store.selectedEndpoint}/manage/metrics
        </code>
        <Button
          text="View Raw"
          className={viewRawClassName}
          onClick={store.openRawView}
          disabled={store.currentEndpointDown}
        />
      </div>
      <Overlay
        isOpen={store.viewRaw}
        onClose={store.closeRawView}
        className="raw-view-overlay"
      >
        <div className={classes(cardClassName, "pt-card", "pt-elevation-4")}>
          <RawViewHeader />
          <RawViewJson />
        </div>
      </Overlay>
    </div>
  );
});
