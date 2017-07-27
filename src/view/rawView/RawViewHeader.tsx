import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { style } from "typestyle";
import { Button } from "@blueprintjs/core";

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

export const RawViewHeader = ReactiveComponent(({}, store) => {
  return (
    <div className={rawViewHeaderClassName}>
      <b>Endpoint:</b>
      <code>
        {store.selectedEndpoint}
      </code>
      <Button
        iconName="cross"
        className="pt-minimal"
        onClick={store.closeRawView}
      />
    </div>
  );
});
