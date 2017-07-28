import { urlSync } from ".../utils";
import { Store } from ".../store";
import { Endpoint, Visualization } from ".../constants";

export function startRouter(store: Store) {
  urlSync({
    setState(url) {
      const endpoint = {
        "/dev": Endpoint.DEV,
        "/qa": Endpoint.QA,
        "/preprod": Endpoint.PREPROD
      }[url.pathname];

      const visibleVisualizations = [];

      (url.searchParams.get("v") || "heap,cache,status")
        .split(",")
        .forEach(v => {
          visibleVisualizations.push(
            {
              heap: Visualization.HEAP,
              cache: Visualization.CACHE,
              status: Visualization.STATUS
            }[v]
          );
        });

      store.visualizations.forEach(v => {
        v.visible = visibleVisualizations.indexOf(v.name) >= 0;
      });

      store.setEndpoint(endpoint || Endpoint.DEV);
    },

    getUrl() {
      const urlFriendlyEndpoint = {
        [Endpoint.DEV]: "dev",
        [Endpoint.QA]: "qa",
        [Endpoint.PREPROD]: "preprod"
      }[store.selectedEndpoint];

      const urlFriendlyVisualizationList = store.visibleVisualizations
        .map(v => {
          return {
            [Visualization.HEAP]: "heap",
            [Visualization.CACHE]: "cache",
            [Visualization.STATUS]: "status"
          }[v.name];
        })
        .join(",");

      return `/${urlFriendlyEndpoint ||
        "dev"}?v=${urlFriendlyVisualizationList}`;
    },

    getTitle() {
      const title = {
        [Endpoint.DEV]: "DEV",
        [Endpoint.QA]: "QA",
        [Endpoint.PREPROD]: "PREPROD"
      }[store.selectedEndpoint];

      return `${title} | Data Collection Server Metrics`;
    },

    shouldPush(current, next) {
      return isValidUrl(current) && isValidUrl(next);
    }
  });
}

function isValidUrl(url: URL) {
  return /^\/(dev|qa|preprod)$/.test(url.pathname);
}
