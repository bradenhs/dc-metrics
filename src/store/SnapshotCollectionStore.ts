import { action, computed, observable } from "mobx";
import { SnapshotStore } from ".../store";
import { api, showToast } from ".../services";
import { MAX_SNAPSHOTS_IN_MEMORY, Endpoint } from ".../constants";
import { last } from "lodash";
import { Intent } from "@blueprintjs/core";

export class SnapshotCollectionStore {
  snapshots = observable.shallowArray<SnapshotStore>();

  constructor(private endpoint: Endpoint) {}

  @computed
  get latestSnapshot() {
    return last(this.snapshots);
  }

  async fetchSnapshot() {
    let snapshot: SnapshotStore;

    try {
      snapshot = await api.fetchSnapshot(this.endpoint);
    } catch (e) {
      console.error(e);
      showToast({
        message: "Error polling " + this.endpoint,
        intent: Intent.WARNING
      });
      return;
    }

    this.addSnapshot(snapshot);
  }

  @action
  addSnapshot(snapshot: SnapshotStore) {
    this.snapshots.push(snapshot);
    if (this.snapshots.length > MAX_SNAPSHOTS_IN_MEMORY) {
      this.snapshots.shift();
    }
  }
}
