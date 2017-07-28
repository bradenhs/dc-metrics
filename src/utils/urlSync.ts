import { computed, action } from "mobx";

interface UrlSyncParams {
  /**
   * This function is called once immediately to make sure the app's state
   * is in sync with the current url. Then whenever the url changes due to
   * something besides a state change this function will be called again to
   * ensure the state is in sync with the url.
   */
  setState(url: URL);

  /**
   * Function that is wrapped in a call to mobx's computed function.
   * It should be possible to derive the url completely from the application's
   * state. This is the function that maps the state to a url. Note this
   * is mapping to the url path i.e. everything after the domain nmae.
   */
  getUrl(): string;

  /**
   * This function maps the current state of the application to what the 
   * title should be. Just like toUrlPath this function is wrapped in mobx's
   * computed function and will be run again automatically to keep the title
   * in sync with the current application state.
   */
  getTitle(): string;

  /**
   * Function using the current url and the new url to decide whether or not
   * pushState or replace state should be called. If this function is not
   * provided push state is always called. If this function is provided
   * push state is called when it return true and replace state is called
   * when this function returns false.
   */
  shouldPush?(current: URL, next: URL): boolean;
}

export function urlSync({
  setState,
  getUrl,
  getTitle,
  shouldPush
}: UrlSyncParams) {
  // Verify we were given the right stuff
  if (typeof setState !== "function") {
    throw new Error("toState must be a function");
  }
  if (typeof getUrl !== "function") {
    throw new Error("toUrl must be a function");
  }

  const runSetState = action(() => setState(url()));

  // Make sure the current state is in sync with the url
  runSetState();

  // Anytime "popstate" is called make sure we are in sync
  window.addEventListener("popstate", runSetState);

  // Keep the title in sync
  computed(getTitle).observe(({ newValue }) => {
    document.title = newValue;
  }, true);

  // Anytime the url path is updated make sure the url reflects that
  computed(getUrl).observe(({ newValue }) => {
    // verify the newValue is a proper pathname
    if (!/^\/.*$/.test(newValue)) {
      throw new Error(
        "The result of toUrlPath should start with exacly one forward slash"
      );
    }

    // Test if we should use pushState or replaceState
    const currentUrl = url();
    const newUrl = new URL(newValue, currentUrl.href);
    let doPushState = currentUrl.href !== newUrl.href;

    if (doPushState && typeof shouldPush === "function") {
      doPushState = shouldPush(currentUrl, newUrl);
    }

    if (doPushState) {
      history.pushState(null, "", newValue);
    } else {
      history.replaceState(null, "", newValue);
    }
  }, true);
}

// Nothing fancy here, just sugar
function url() {
  return new URL(location.href);
}
