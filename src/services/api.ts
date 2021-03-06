import { fetchJSON, asNumber, asInteger } from ".../utils";
import { SnapshotStore } from ".../store";
import { Endpoint } from ".../constants";

export async function getDetailsViewJSON(
  endpoint: Endpoint,
  detailsEndpoint: string
) {
  try {
    const response = await fetch(`${endpoint}/${detailsEndpoint}`);
    return await response.json();
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getHealthStatus(endpoint: Endpoint) {
  try {
    const response = await fetch(`${endpoint}/manage/health`);
    return await response.json();
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function clearCaches(endpoint: Endpoint) {
  try {
    const response = await fetch(`${endpoint}/api/manage/cache/clearAll`, {
      method: "POST"
    });
    return response.status === 200;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function fetchSnapshot(endpoint: Endpoint) {
  const data = await fetchJSON(endpoint + "/manage/metrics");

  return parseSnapshotData(data);
}

function parseSnapshotData(data) {
  const snapshot = new SnapshotStore();

  getCacheKeys(data).forEach(key => {
    const { cacheName, metric } = parseCacheKey(key);
    if (snapshot.cache[cacheName] == null) {
      snapshot.cache[cacheName] = {
        hitRatio: 0,
        missRatio: 0,
        size: 0
      };
    }
    if (metric === "hit.ratio") {
      snapshot.cache[cacheName].hitRatio = asNumber(data[key]);
    } else if (metric === "miss.ratio") {
      snapshot.cache[cacheName].missRatio = asNumber(data[key]);
    } else if (metric === "size") {
      snapshot.cache[cacheName].size = asNumber(data[key]);
    } else {
      snapshot.cache[cacheName][metric] = asNumber(data[key]);
    }
  });

  getCounterKeys(data).forEach(key => {
    const { status, endpoint } = parseCounterKey(key);
    if (snapshot.counter[endpoint] == null) {
      snapshot.counter[endpoint] = {};
    }
    snapshot.counter[endpoint][status] = asInteger(data[key]);
  });

  snapshot.heapCommitted = asInteger(data["heap.committed"]);
  snapshot.heapInit = asInteger(data["heap.init"]);
  snapshot.heapUsed = asInteger(data["heap.used"]);
  snapshot.heap = asInteger(data["heap"]);

  snapshot.raw = data;

  return snapshot;
}

function parseCacheKey(key: string) {
  const keyParts = key.split(".");
  keyParts.shift();
  const cacheName = keyParts.shift();
  const metric = keyParts.join(".");
  return { cacheName, metric };
}

function parseCounterKey(key: string) {
  const keyParts = key.split(".");
  keyParts.shift();
  keyParts.shift();
  const status = parseInt(keyParts.shift());
  const endpoint = keyParts.join(".");
  return { status, endpoint };
}

function getCacheKeys(data) {
  return Object.keys(data).filter(key =>
    /cache\..*\.(size|((hit|miss)\.ratio))/.test(key)
  );
}

function getCounterKeys(data) {
  return Object.keys(data).filter(key =>
    /counter\.status\.\d{3}\..*/.test(key)
  );
}
