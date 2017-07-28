import { SnapshotCollectionStore, VisualizationStore } from ".../store";
import { sleep } from ".../utils";
import { observable, computed, action } from "mobx";
import {
  Endpoint,
  Visualization,
  METRICS_POLLING_INTERVAL,
  HEALTH_POLLING_INTERVAL
} from ".../constants";
import { showToast, api } from ".../services";
import * as copy from "copy-to-clipboard";
import { Intent } from "@blueprintjs/core";
import { autobind } from "core-decorators";

@autobind
export class Store {
  devSnapshotCollection = new SnapshotCollectionStore(Endpoint.DEV);
  qaSnapshotCollection = new SnapshotCollectionStore(Endpoint.QA);
  preprodSnapshotCollection = new SnapshotCollectionStore(Endpoint.PREPROD);

  @observable selectedEndpoint: Endpoint;
  @observable viewRaw = false;
  @observable detailsViewVisible = false;
  @observable detailsViewJSON = null;
  @observable detailsViewEndpoint: string;

  endpointStatuses = observable.shallowObject({
    [Endpoint.DEV]: null,
    [Endpoint.QA]: null,
    [Endpoint.PREPROD]: null
  });

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

  @computed
  get currentEndpointTitle() {
    return this.getEndpointTitle(this.selectedEndpoint);
  }

  @computed
  get currentEndpointDown() {
    return !this.isEndpointUp(this.selectedEndpoint);
  }

  async clearCurrentEndpointCache() {
    const success = await api.clearCaches(this.selectedEndpoint);
    if (success) {
      showToast({
        message: "Caches cleared successfully",
        intent: Intent.SUCCESS
      });
    } else {
      showToast({
        message: "There was an issue clearing the cache",
        intent: Intent.WARNING
      });
    }
  }

  isEndpointUp(endpoint: Endpoint) {
    try {
      return this.endpointStatuses[endpoint].status === "UP";
    } catch (e) {
      return false;
    }
  }

  getEndpointTitle(endpoint: Endpoint) {
    return {
      [Endpoint.DEV]: "Development",
      [Endpoint.QA]: "QA",
      [Endpoint.PREPROD]: "Pre-Production"
    }[endpoint];
  }

  shareCurrentView() {
    if (copy(location.href)) {
      showToast({
        message: "Link to current view copied to the clipboard",
        intent: Intent.SUCCESS,
        iconName: "link"
      });
    } else {
      showToast({
        message: "There was an issue copying the link to the clipboard",
        intent: Intent.WARNING,
        iconName: "link"
      });
    }
  }

  startPolling() {
    this.startMetricsPolling();
    this.startHealthPolling();
  }

  async startHealthPolling() {
    while (true) {
      this.updateEndpointStatus(Endpoint.DEV);
      this.updateEndpointStatus(Endpoint.QA);
      this.updateEndpointStatus(Endpoint.PREPROD);
      await sleep(HEALTH_POLLING_INTERVAL);
    }
  }

  async updateEndpointStatus(endpoint: Endpoint) {
    const status = await api.getHealthStatus(endpoint);
    this.setEndpointStatus(endpoint, status);
  }

  async startMetricsPolling() {
    while (true) {
      if (this.isEndpointUp(Endpoint.DEV)) {
        this.devSnapshotCollection.fetchSnapshot();
      }
      if (this.isEndpointUp(Endpoint.QA)) {
        this.qaSnapshotCollection.fetchSnapshot();
      }
      if (this.isEndpointUp(Endpoint.PREPROD)) {
        this.preprodSnapshotCollection.fetchSnapshot();
      }
      await sleep(METRICS_POLLING_INTERVAL);
    }
  }

  async openDetailsView(detailsViewEndpoint: string) {
    this.prepareDetailsView(detailsViewEndpoint);
    this.setDetailsViewJSON(
      await api.getDetailsViewJSON(this.selectedEndpoint, detailsViewEndpoint)
    );
  }

  @action
  closeDetailsView() {
    this.detailsViewVisible = false;
  }

  @action
  setDetailsViewJSON(detailsViewJSON) {
    this.detailsViewJSON = detailsViewJSON;
  }

  @action
  prepareDetailsView(detailsViewEndpoint: string) {
    this.detailsViewEndpoint = detailsViewEndpoint;
    this.detailsViewVisible = true;
    this.detailsViewJSON = null;
  }

  @action
  setEndpointStatus(endpoint: Endpoint, status: any) {
    this.endpointStatuses[endpoint] = status;
  }

  @action
  setEndpoint(endpoint: Endpoint) {
    this.selectedEndpoint = endpoint;
  }

  @action
  openRawView() {
    this.viewRaw = true;
  }

  @action
  closeRawView() {
    this.viewRaw = false;
  }
}
