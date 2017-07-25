export function sleep(milliseconds = 250) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
