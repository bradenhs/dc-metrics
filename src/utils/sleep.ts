export function sleep(milliseconds = 2000) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
