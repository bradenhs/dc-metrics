import { computed } from "mobx";

let start = Date.now();

export class SnapshotStore {
  readonly time = Math.floor((Date.now() - start) / 1000);

  raw: string;

  cache: {
    [cacheName: string]: {
      hitRatio: number;
      missRatio: number;
      size: number;
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
      { label: "Heap", value: this.heap },
      { label: "Heap Committed", value: this.heapCommitted },
      { label: "Heap Used", value: this.heapUsed },
      { label: "Heap Init", value: this.heapInit }
    ];
  }

  @computed
  get cacheHitMissData() {
    return Object.keys(this.cache).sort().map(cacheName => {
      return {
        cacheName,
        size: this.cache[cacheName].size,
        data: [
          {
            label: "Hits",
            value: this.cache[cacheName].hitRatio
          },
          {
            label: "Misses",
            value: this.cache[cacheName].missRatio
          }
        ]
      };
    });
  }

  @computed
  get statusCodeData() {
    return Object.keys(this.counter).sort().map(endpoint => {
      return {
        endpoint,
        data: Object.keys(this.counter[endpoint]).map(status => {
          return {
            label: status,
            value: this.counter[endpoint][status]
          };
        })
      };
    });
  }

  @computed
  get sortedRaw() {
    const obj = {};

    Object.keys(this.raw).sort().forEach(key => {
      obj[key] = this.raw[key];
    });

    return obj;
  }
}
