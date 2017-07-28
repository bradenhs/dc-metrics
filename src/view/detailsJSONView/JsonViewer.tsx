import * as React from "react";
import { ReactiveComponent } from ".../utils";
import { style } from "typestyle";
import ReactJson from "react-json-view";

const rawJsonViewClassName = style({
  overflowY: "scroll",
  height: "calc(100% - 40px)",
  borderRadius: "4px"
});

interface Props {
  json: object;
}

export const JsonViewer = ReactiveComponent<Props>(({ json }) => {
  return (
    <div className={rawJsonViewClassName}>
      <ReactJson
        theme="eighties"
        style={{
          padding: "20px",
          background: "rgba(16, 22, 26, 0.3)",
          boxShadow: "inset 0 0 0 1px rgba(16, 22, 26, 0.4)"
        }}
        name={false}
        src={json}
      />
    </div>
  );
});
