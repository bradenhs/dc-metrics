import { observable } from "mobx";

let start = Date.now();

export class SnapshotStore {
  readonly time = Math.floor((Date.now() - start) / 1000);
  @observable memory: number;
  @observable memoryFree: number;
  @observable loaded = false;
}
