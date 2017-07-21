import { sleep, fetchJSON } from '~/utils'
import { MemoryCollection, MemoryViewModel, RawMemoryDataModel } from '~/model'
import { runInAction } from 'mobx'

export const memory = {
  async startPolling (memoryCollection: MemoryCollection) {
    while (true) {
      createSnapshot(memoryCollection)
      await sleep()
    }
  }
}

async function createSnapshot (memoryCollection: MemoryCollection) {
  const snapshot = new MemoryViewModel({
    heap: null,
    heapCommitted: null,
    heapInit: null,
    heapUsed: null,
    nonheap: null,
    nonheapCommitted: null,
    nonheapInit: null,
    nonheapUsed: null,
    mem: null,
    memFree: null
  })

  memoryCollection.devSnapshots.push(snapshot)

  let data: RawMemoryDataModel

  try {
    data = await fetchJSON('http://amis-dev:9000/manage/metrics')
    console.log(data)
  } catch (e) {
    console.error(e)
    runInAction(() => {
      snapshot.fetching = false
      snapshot.hasError = true
    })
    return
  }

  mapRawDataToSnapshot(snapshot, data)
}

function mapRawDataToSnapshot (
  snapshot: MemoryViewModel,
  data: RawMemoryDataModel
) {
  runInAction(() => {
    snapshot.data = {
      heap: data['heap'],
      heapCommitted: data['heap.committed'],
      heapInit: data['heap.init'],
      heapUsed: data['heap.used'],
      nonheap: data['nonheap'],
      nonheapCommitted: data['nonheap.committed'],
      nonheapInit: data['nonheap.init'],
      nonheapUsed: data['nonheap.used'],
      mem: data['mem'],
      memFree: data['mem.free']
    }

    snapshot.fetching = false

    // If any of the values returned are not an integer then we have a problem
    snapshot.hasError = Object.keys(snapshot.data).some(
      (key) => !Number.isInteger(snapshot.data[key])
    )
  })
}
