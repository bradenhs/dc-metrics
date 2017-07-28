import * as React from "react";
import { Overlay, Spinner, Button } from "@blueprintjs/core";
import { ReactiveComponent } from ".../utils";
import { style, classes } from "typestyle";
import { JsonViewer } from ".../view";

const cardPadding = 60;

const cardClassName = style({
  position: "fixed",
  left: `${cardPadding}px`,
  top: `${cardPadding}px`,
  right: `${cardPadding}px`,
  bottom: `${cardPadding}px`,
  zIndex: 21
});

const rawViewHeaderClassName = style({
  lineHeight: "30px",
  marginLeft: "10px",
  marginBottom: "10px",
  $nest: {
    code: {
      marginLeft: "14px"
    },
    button: {
      float: "right"
    }
  }
});

export const DetailsJSONView = ReactiveComponent(({}, store) => {
  return (
    <Overlay
      isOpen={store.detailsViewVisible}
      onClose={store.closeDetailsView}
      className="raw-view-overlay"
    >
      <div className={classes(cardClassName, "pt-card", "pt-elevation-4")}>
        <div className={rawViewHeaderClassName}>
          <b>Endpoint:</b>
          <code>
            {store.selectedEndpoint}/{store.detailsViewEndpoint}
          </code>
          <Button
            iconName="cross"
            className="pt-minimal"
            onClick={store.closeDetailsView}
          />
        </div>
        {store.detailsViewJSON == null
          ? <Spinner />
          : <JsonViewer json={store.detailsViewJSON} />}
      </div>
    </Overlay>
  );
});
