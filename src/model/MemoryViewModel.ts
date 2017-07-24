import { observable } from "mobx";
import { MemoryDataModel } from "~/model";

export class MemoryViewModel {
  data: MemoryDataModel;

  readonly timeRecorded = Date.now();
  @observable fetching = true;
  @observable hasError = false;

  constructor(data: MemoryDataModel) {
    this.data = observable.shallowObject(data);
  }
}
