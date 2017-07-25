import { SnapshotCollectionStore, VisualizationStore } from "~/store";
import { sleep } from "~/utils";
import { observable, computed } from "mobx";
import { Endpoint, Visualization } from "~/constants";

export class Store {
  devSnapshotCollection = new SnapshotCollectionStore(Endpoint.DEV);
  qaSnapshotCollection = new SnapshotCollectionStore(Endpoint.QA);
  preprodSnapshotCollection = new SnapshotCollectionStore(Endpoint.PREPROD);

  @observable selectedEndpoint = Endpoint.DEV;

  visualizations = [
    new VisualizationStore(Visualization.CACHE, 0),
    new VisualizationStore(Visualization.HEAP, 1),
    new VisualizationStore(Visualization.STATUS, 2)
  ];

  async startPolling() {
    while (true) {
      this.devSnapshotCollection.fetchSnapshot();
      this.qaSnapshotCollection.fetchSnapshot();
      this.preprodSnapshotCollection.fetchSnapshot();
      await sleep();
    }
  }

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

  @computed
  get location() {
    const urlFriendlyEndpoint = {
      [Endpoint.DEV]: "dev",
      [Endpoint.PREPROD]: "preprod",
      [Endpoint.QA]: "qa"
    };

    const sortedVisualizations = this.visibleVisualizations
      .slice()
      .sort((a, b) => {
        return a.position > b.position ? 1 : -1;
      });

    return `#!/${urlFriendlyEndpoint}?${sortedVisualizations.join(",")}`;
  }
}
