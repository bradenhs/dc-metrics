import { computed } from "mobx";

let start = Date.now();

export class SnapshotStore {
  readonly time = Math.floor((Date.now() - start) / 1000);

  cache: {
    [cacheName: string]: {
      hitRatio: number;
      missRatio: number;
    };
  } = {};

  counter: {
    [endpoint: string]: {
      [status: number]: number;
    };
  } = {};

  heapCommitted: number;
  heapInit: number;
  heapUsed: number;
  heap: number;

  @computed
  get statusCodeTotals() {
    const totals: { [status: number]: number } = {};
    Object.keys(this.counter).forEach(endpoint => {
      Object.keys(this.counter[endpoint]).forEach(status => {
        if (totals[status] == null) {
          totals[status] = 0;
        }
        totals[status] += this.counter[endpoint][status];
      });
    });
    return totals;
  }

  @computed
  get heapData() {
    return [
      { x: "Heap Committed", y: this.heapCommitted },
      { x: "Heap Init", y: this.heapInit },
      { x: "Heap Used", y: this.heapUsed },
      { x: "Heap", y: this.heap }
    ];
  }

  @computed
  get cacheHitMissData() {
    return Object.keys(this.cache).sort().map(cacheName => {
      return {
        cacheName,
        data: [
          { x: 0, y: this.cache[cacheName].hitRatio, label: "Hit Ratio" },
          { x: 1, y: this.cache[cacheName].missRatio, label: "Miss Ratio" }
        ]
      };
    });
  }

  @computed
  get statusCodeData() {
    return Object.keys(this.statusCodeTotals).map((status, index) => {
      return { x: index, y: this.statusCodeTotals[status], label: status };
    });
  }
}
