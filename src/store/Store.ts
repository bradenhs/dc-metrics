import { SnapshotCollectionStore } from "~/store";
import { sleep } from "~/utils";

export class Store {
  snapshotCollection = new SnapshotCollectionStore();

  async startPolling() {
    while (true) {
      await sleep();
    }
  }
}
