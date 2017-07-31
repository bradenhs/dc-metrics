import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { Button } from "@blueprintjs/core";

export const ShareCard = ReactiveComponent(({}, { shareCurrentView }) => {
  return (
    <div className="pt-card">
      <Button
        text="Share Current View"
        className="pt-fill"
        onClick={shareCurrentView}
      />
    </div>
  );
});
