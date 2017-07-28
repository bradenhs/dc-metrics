import { observable, action } from "mobx";
import { Visualization } from ".../constants";

export class VisualizationStore {
  readonly name: Visualization;
  @observable position: number;
  @observable visible = true;

  constructor(name: Visualization, index: number) {
    this.name = name;
    this.position = index;
  }

  @action.bound
  toggleVisiblility() {
    this.visible = !this.visible;
  }
}
