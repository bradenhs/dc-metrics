import { ReactiveComponent } from ".../utils";
import * as React from "react";
import * as V from "victory";
import { Colors } from "@blueprintjs/core";

interface Props {
  data: {
    label: string;
    value: number;
  }[];
  valueLabel: (d: any) => string;
  dimensions: {
    width: number;
    height: number;
  };
}

export const BarChart = ReactiveComponent<Props>(props => {
  return (
    <V.VictoryChart
      domainPadding={50}
      width={props.dimensions.width}
      height={props.dimensions.height}
    >
      <V.VictoryBar
        style={{
          data: {
            fill: Colors.BLUE4
          },
          labels: {
            fill: Colors.WHITE
          }
        }}
        data={props.data.map(d => ({ x: d.label, y: d.value }))}
        categories={
          {
            x: props.data.map(d => d.label)
          } as any
        }
        labels={props.valueLabel}
        labelComponent={<V.VictoryLabel />}
      />
      <V.VictoryAxis
        style={{
          axis: {
            stroke: Colors.DARK_GRAY2
          },
          tickLabels: {
            fill: Colors.WHITE
          }
        }}
      />
    </V.VictoryChart>
  );
});
