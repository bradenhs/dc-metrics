import { observable } from 'mobx'
import { TodoViewModel, Store } from '~/model'

export class TodoCollection {
  todosById = observable.shallowMap<TodoViewModel>()

  constructor (private store: Store) {}
}
