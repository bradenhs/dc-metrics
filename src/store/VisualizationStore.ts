import { observable, action } from "mobx";

export class VisualizationStore {
  readonly name: string;
  @observable position: number;
  @observable visible = true;

  constructor(name: string, index: number) {
    this.name = name;
    this.position = index;
  }

  @action
  toggleVisiblility() {
    this.visible = !this.visible;
  }
}
