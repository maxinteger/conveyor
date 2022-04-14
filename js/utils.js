export function fromEventOnce(element, event, timeout=-1) {
  return new Promise((resolve, reject) => {
    let timerId
    const listener = (event) => {
      resolve(event)
      clearTimeout(timerId)
    }
    element.addEventListener(event, listener, {once: true})

    if (typeof timeout === 'number' && timeout > 0) {
      timerId = setTimeout(() => {
        element.removeEventListener(event, listener)
        reject()
      }, timeout)
    }
  })
}
