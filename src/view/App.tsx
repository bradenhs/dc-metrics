import * as React from 'react'
import { observer } from '~/utils'
import { style } from 'typestyle'
import { Tab2, Tabs2 } from '@blueprintjs/core'
import {
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryAxis,
  VictoryArea,
  VictoryLabel,
  VictoryLine,
  VictoryScatter
} from 'victory'

const appClassName = style({
  padding: '40px'
})

const chartContainerClassName = style({
  height: '400px'
})

export const App = observer(({}, { store }) => {
  return (
    <div className={appClassName}>
      <h1>Server Metrics</h1>
      <Tabs2 id='main'>
        <Tab2 id='dev' title='Development' panel={<div />} />
        <Tab2 id='qa' title='Quality Assurance' panel={<div />} />
        <Tab2 id='preprod' title='Pre-Production' panel={<div />} />
      </Tabs2>
      <div className={chartContainerClassName}>
        <VictoryChart animate={{ duration: 250 }}>
          <VictoryArea
            data={store.memoryCollection.devMemoryFree}
            style={{
              data: {
                fill: 'rgba(50,200,100,.3)'
              }
            }}
          />
        </VictoryChart>
      </div>
    </div>
  )
})
