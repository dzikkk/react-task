export function delayFn(delayInMs = 1000) {
  return new Promise(resolve => setTimeout(resolve, delayInMs));
}