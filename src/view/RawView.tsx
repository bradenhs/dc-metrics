import * as React from "react";
import { ReactiveComponent } from "~/utils";
import { style, classes } from "typestyle";
import { Button, Overlay } from "@blueprintjs/core";

const endPointClassName = style({
  fontSize: "13px",
  margin: "0 4px"
});

const viewRawClassName = classes(
  style({ float: "right", marginTop: "-2px", marginRight: "-2px" }),
  "pt-small",
  "pt-intent-primary"
);

const cardClassName = classes(
  style({
    top: "200px",
    left: "calc(50% - 200px)",
    zIndex: 21,
    width: "400px"
  }),
  "pt-card",
  "pt-elevation-4"
);

export const RawView = ReactiveComponent(
  ({}, { selectedEndpoint, openRawView, closeRawView, viewRaw }) => {
    return (
      <div>
        <div className="pt-callout pt-intent-primary">
          Polling <code className={endPointClassName}>
            {selectedEndpoint}
          </code>{" "}
          once every second.
          <Button
            text="View Raw"
            className={viewRawClassName}
            onClick={openRawView}
          />
        </div>
        <Overlay isOpen={viewRaw} onClose={closeRawView}>
          <div className={cardClassName}>
            <h3>I'm an Overlay!</h3>
            <p>
              This is a simple container with some inline styles to position it
              on the screen. Its CSS transitions are customized for this example
              only to demonstrate how easily custom transitions can be
              implemented.
            </p>
            <p>
              Click the right button below to transfer focus to the "Show
              overlay" trigger button outside of this overlay. If persistent
              focus is enabled, focus will be constrained to the overlay. Use
              the <code>tab</code> key to move to the next focusable element to
              illustrate this effect.
            </p>
          </div>
        </Overlay>
      </div>
    );
  }
);
