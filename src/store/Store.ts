import { SnapshotCollectionStore, UIStore } from "~/store";
import { sleep } from "~/utils";

export class Store {
  snapshotCollection = new SnapshotCollectionStore(this);
  ui = new UIStore();

  async startPolling() {
    while (true) {
      this.snapshotCollection.addSnapshot();
      await sleep();
    }
  }
}
