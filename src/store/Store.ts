import { SnapshotCollectionStore, VisualizationStore } from "~/store";
import { sleep } from "~/utils";
import { observable, computed, action } from "mobx";
import { Endpoint, Visualization } from "~/constants";

export class Store {
  devSnapshotCollection = new SnapshotCollectionStore(Endpoint.DEV);
  qaSnapshotCollection = new SnapshotCollectionStore(Endpoint.QA);
  preprodSnapshotCollection = new SnapshotCollectionStore(Endpoint.PREPROD);

  @observable selectedEndpoint: Endpoint;
  @observable viewRaw = false;

  visualizations = [
    new VisualizationStore(Visualization.CACHE, 0),
    new VisualizationStore(Visualization.HEAP, 1),
    new VisualizationStore(Visualization.STATUS, 2)
  ];

  @computed
  get selectedSnapshotCollection() {
    return {
      [Endpoint.DEV]: this.devSnapshotCollection,
      [Endpoint.QA]: this.qaSnapshotCollection,
      [Endpoint.PREPROD]: this.preprodSnapshotCollection
    }[this.selectedEndpoint];
  }

  @computed
  get visibleVisualizations() {
    return this.visualizations.filter(visualization => visualization.visible);
  }

  async startPolling() {
    while (true) {
      this.devSnapshotCollection.fetchSnapshot();
      this.qaSnapshotCollection.fetchSnapshot();
      this.preprodSnapshotCollection.fetchSnapshot();
      await sleep();
    }
  }

  @action.bound
  setEndpoint(endpoint: Endpoint) {
    this.selectedEndpoint = endpoint;
  }

  @action.bound
  openRawView() {
    this.viewRaw = true;
  }

  @action.bound
  closeRawView() {
    this.viewRaw = false;
  }
}
