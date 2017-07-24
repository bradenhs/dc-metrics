import { observable, action } from "mobx";
import { throttle } from "lodash";

export class UIStore {
  @observable windowWidth = window.innerWidth;
  @observable windowHeight = window.innerHeight;

  constructor() {
    window.addEventListener(
      "resize",
      throttle(
        action(() => {
          this.windowHeight = window.innerHeight;
          this.windowWidth = window.innerWidth;
        }),
        100
      )
    );
  }
}
