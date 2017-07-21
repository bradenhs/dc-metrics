import {
  ReactNode,
  ReactElement,
  ValidationMap,
  ClassicComponentClass
} from 'react'
import { observer as mobxReactObserver } from 'mobx-react'
import { Store } from '~/model'
import { object } from 'prop-types'

interface StatelessReactiveComponent<P = {}> {
  (
    props: P & { children?: ReactNode },
    context?: { store: Store; [key: string]: any }
  ): ReactElement<any> | null
  propTypes?: ValidationMap<P>
  contextTypes?: ValidationMap<any>
  defaultProps?: Partial<P>
  displayName?: string
}

export function observer<P> (clazz: StatelessReactiveComponent<P>) {
  clazz.contextTypes = {
    store: object
  }
  return mobxReactObserver(clazz)
}
