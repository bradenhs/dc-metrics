import { computed } from "mobx";

interface UrlSyncParams {
  /**
   * This function is called once immediately to make sure the app's state
   * is in sync with the current url. Then whenever the url changes due to
   * something besides a state change this function will be called again to
   * ensure the state is in sync with the url.
   */
  toState(url: URL);

  /**
   * Function that is wrapped in a call to mobx's computed function.
   * It should be possible to derive the url completely from the application's
   * state. This is the function that maps the state to a url. Note this
   * is mapping to the url path i.e. everything after the domain nmae.
   */
  toUrlPath(): string;

  /**
   * Function using the current url and the new url to decide whether or not
   * pushState or replace state should be called. If this function is not
   * provided push state is always called. If this function is provided
   * push state is called when it return true and replace state is called
   * when this function returns false.
   */
  shouldPush?(current: URL, next: URL): boolean;
}

export function urlSync({ toState, toUrlPath, shouldPush }: UrlSyncParams) {
  // Verify we were given the right stuff
  if (typeof toState !== "function") {
    throw new Error("toState must be a function");
  }
  if (typeof toUrlPath !== "function") {
    throw new Error("toUrl must be a function");
  }

  // Make sure the current state is in sync with the url
  toState(getUrl());

  // Anytime "popstate" is called make sure we are in sync
  window.addEventListener("popstate", () => {
    toState(getUrl());
  });

  // Anytime the url path is updated make sure the url reflects that
  computed(toUrlPath).observe(({ newValue }) => {
    // verify the newValue is a proper pathname
    if (!/^\/.*$/.test(newValue)) {
      throw new Error(
        "The result of toUrlPath should start with exacly one forward slash"
      );
    }

    // Test if we should use pushState or replaceState
    let doPushState = true;
    if (typeof shouldPush === "function") {
      const currentUrl = getUrl();
      doPushState = shouldPush(currentUrl, new URL(newValue, currentUrl.href));
    }

    if (doPushState) {
      history.pushState(null, "", newValue);
    } else {
      history.replaceState(null, "", newValue);
    }
  }, true);
}

// Nothing fancy here, just sugar
function getUrl() {
  return new URL(location.href);
}
