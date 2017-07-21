import { ReactNode, ReactElement, ValidationMap } from 'react'
import { Store } from '~/model'

declare module 'mobx-react' {
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

  export function observer<P> (
    clazz: StatelessReactiveComponent<P> | React.ComponentClass<P>
  ): React.ClassicComponentClass<P>
}
