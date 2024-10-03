export function wait (timesMS) {
  return new Promise(resolve => {
    setTimeout(resolve, timesMS)
  })
}
