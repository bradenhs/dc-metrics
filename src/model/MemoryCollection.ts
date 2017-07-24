import { observable } from "mobx";
import { MemoryViewModel } from "~/model";

export class MemoryCollection {
  devSnapshots = observable.shallowArray<MemoryViewModel>();
  qaSnapshots = observable.shallowArray<MemoryViewModel>();
  preprodSnapshots = observable.shallowArray<MemoryViewModel>();

  get devMemoryFree() {
    const arr = this.devSnapshots.map((snap, index) => {
      return { x: index, y: snap.data.memFree || 0, hi: "bob" };
    });
    return arr.slice(Math.max(arr.length - 20, 1));
  }
}
