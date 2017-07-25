import { autorun, computed } from "mobx";

interface UrlSyncerParams<T> {
  setStateFromUrl(url: string);
  mapStateToUrl(state: T): string;
}

export function createUrlSyncer<T>({
  mapUrlToState,
  mapStateToUrl
}: UrlSyncerParams<T>) {
  window.addEventListener();
}
