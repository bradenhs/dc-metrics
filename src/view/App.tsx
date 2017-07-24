import * as React from "react";
import { ReactiveComponent } from "~/utils";
import { style } from "typestyle";
import * as V from "victory";

const chartContainerClassName = style({
  height: "400px",
  background: "blue"
});

export const App = ReactiveComponent(({}, store) => {
  console.log("test", store);
  return (
    <div>
      <div className={chartContainerClassName}>
        <V.VictoryChart
          animate={{ duration: 250 }}
          containerComponent={<V.VictoryContainer responsive={false} />}
        >
          <V.VictoryArea
            style={{
              data: {
                fill: "rgba(50,200,100,.3)"
              }
            }}
          />
          <V.VictoryAxis dependentAxis />
        </V.VictoryChart>
      </div>
    </div>
  );
});
