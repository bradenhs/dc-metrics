import { observable } from "mobx";
import { SnapshotStore } from "~/store";

export class SnapshotCollectionStore {
  snapshots = observable.shallowArray<SnapshotStore>();
}
