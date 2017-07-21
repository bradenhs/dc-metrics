import { normalize } from 'csstips'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import { App } from '~/view'
import { memory } from '~/controller'
import { Store } from '~/model'
import { cssRaw } from 'typestyle'
import { object } from 'prop-types'
import { StoreProvider } from '~/utils'

// Initial CSS setup
normalize()
cssRaw(`
  body {
    background: #293742;
  }

  * {
    outline: none !important;
  }
`)

// Allows us to capture touch tap events
injectTapEventPlugin()

// Initialize our store
const store = new Store()
// Create a container the application and render our app into it
const appContainer = document.createElement('div')
document.body.appendChild(appContainer)
ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  appContainer
)

// Intiate the polling
memory.startPolling(store.memoryCollection)
