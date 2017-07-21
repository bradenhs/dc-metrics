import { observable } from 'mobx'
import { TodoDataModel, Store } from '~/model'

export class TodoViewModel {
  data: TodoDataModel

  constructor (data: TodoDataModel, private store: Store) {
    this.data = observable.shallowObject(data)
  }
}
