import { TodoCollection } from '~/model'

export class Store {
  todoCollection = new TodoCollection(this)
}
