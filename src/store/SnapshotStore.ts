import { observable } from "mobx";

export class SnapshotStore {
  readonly time = Date.now();
  @observable memory: number;
  @observable memoryFree: number;
}
