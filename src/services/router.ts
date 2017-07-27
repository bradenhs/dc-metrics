import { urlSync } from ".../utils";
import { Store } from ".../store";
import { Endpoint } from ".../constants";

export function startRouter(store: Store) {
  urlSync({
    setState(url) {
      const endpoint = {
        "/dev": Endpoint.DEV,
        "/qa": Endpoint.QA,
        "/preprod": Endpoint.PREPROD
      }[url.pathname];

      store.setEndpoint(endpoint || Endpoint.DEV);
    },

    getUrl() {
      const urlFriendlyEndpoint = {
        [Endpoint.DEV]: "dev",
        [Endpoint.QA]: "qa",
        [Endpoint.PREPROD]: "preprod"
      }[store.selectedEndpoint];

      return `/${urlFriendlyEndpoint || "dev"}`;
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
