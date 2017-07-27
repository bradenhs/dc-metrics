import { ReactiveComponent } from ".../utils";
import * as React from "react";

export const HeapVis = ReactiveComponent(() => {
  return <div>Heap</div>;
});

// return (
//   <Card title="Heap Information">
//     {snapshotCollection.latestSnapshot &&
//       <V.VictoryChart domainPadding={50} width={800} height={300} style={{}}>
//         <V.VictoryBar
//           style={{
//             data: {
//               fill: Colors.BLUE5
//             },
//             labels: {
//               fill: Colors.GRAY4
//             }
//           }}
//           animate={{
//             duration: 500,
//             onEnter: {
//               duration: 0
//             }
//           }}
//           data={snapshotCollection.latestSnapshot.heapData}
//           categories={
//             {
//               x: ["Heap", "Heap Committed", "Heap Init", "Heap Used"]
//             } as any
//           }
//           labels={d => Math.floor(d.y / 1000) + "MB"}
//           labelComponent={<V.VictoryLabel />}
//         />
//         <V.VictoryAxis
//           style={{
//             axis: {
//               stroke: Colors.GRAY4
//             },
//             tickLabels: {
//               fill: Colors.GRAY4
//             }
//           }}
//         />
//       </V.VictoryChart>}
//   </Card>
// );
