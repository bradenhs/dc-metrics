import { action, computed, observable } from "mobx";
import { SnapshotStore, Store } from "~/store";
import { api } from "~/services";
import { last } from "lodash";

export class SnapshotCollectionStore {
  snapshots = observable.shallowArray<SnapshotStore>();

  constructor(private root: Store) {}

  @computed
  get secondsInView() {
    return this.root.ui.windowWidth / 50;
  }

  @computed
  get loadedSnapshots() {
    return this.snapshots.filter(snap => snap.loaded);
  }

  @computed
  get domain(): { x: [number, number]; y: [number, number] } {
    const minY = 0;
    const maxY = 750000;
    if (this.loadedSnapshots.length < 2) {
      return { x: [0, 1], y: [minY, maxY] };
    }
    const maxX = Math.max(last(this.loadedSnapshots).time, this.secondsInView);
    const minX = maxX - this.secondsInView;
    return { x: [minX, maxX], y: [minY, maxY] };
  }

  async addSnapshot() {
    const snapshot = this.createSnapshot();

    let data: api.SnapshotData;

    try {
      data = await api.fetchSnapshotData();
    } catch (e) {
      // TODO handle error here
      return;
    }

    this.populateSnapshot(snapshot, data);
  }

  @action
  createSnapshot() {
    const snapshot = new SnapshotStore();
    this.snapshots.push(snapshot);
    return snapshot;
  }

  @action
  populateSnapshot(snapshot: SnapshotStore, data: api.SnapshotData) {
    snapshot.memory = data["mem"];
    snapshot.memoryFree = data["mem.free"];
    snapshot.loaded = true;
  }
}
