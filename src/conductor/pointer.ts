// One shared pointer listener for every conductor whose eyes follow the cursor,
// batched to a single update per animation frame.
type Listener = (x: number, y: number) => void

const listeners = new Set<Listener>()
let pointerX = 0
let pointerY = 0
let frame = 0

function flush() {
  frame = 0
  listeners.forEach((listener) => listener(pointerX, pointerY))
}

function onPointerMove(event: PointerEvent) {
  pointerX = event.clientX
  pointerY = event.clientY
  if (!frame) frame = window.requestAnimationFrame(flush)
}

export function subscribePointer(listener: Listener): () => void {
  if (listeners.size === 0) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  }
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      window.removeEventListener('pointermove', onPointerMove)
      window.cancelAnimationFrame(frame)
      frame = 0
    }
  }
}
