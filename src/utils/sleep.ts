export function sleep(milliseconds = 500) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
