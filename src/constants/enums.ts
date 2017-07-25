export enum Endpoint {
  DEV = "http://amis-dev:9000/manage/metrics",
  QA = "http://amis-qa:9000/manage/metrics",
  PREPROD = "http://amis-preprod:9000/manage/metrics"
}

export enum Visualization {
  HEAP = "heap",
  CACHE = "cache",
  STATUS = "status"
}
