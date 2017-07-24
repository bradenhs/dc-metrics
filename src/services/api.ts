import { fetchJSON } from "~/utils";

export interface SnapshotData {
  "mem": number;
  "mem.free": number;
}

export async function fetchSnapshotData() {
  const data: SnapshotData = await fetchJSON(
    "http://amis-dev:9000/manage/metrics"
  );
  if (
    typeof data !== "object" ||
    typeof data["mem"] !== "number" ||
    typeof data["mem.free"] !== "number"
  ) {
    throw new Error("Unexpected response from fetchSnapshotData");
  }
  return data;
}
