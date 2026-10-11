import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ConductorFigure } from './Conductor'

// The standing conductor with a thought bubble above and to his right.
// The figure's viewBox crops his 160×160 space to 84×158 around the body.
const VIEW = { x: 38, y: 2, width: 84, height: 158 }

interface Props {
  visible: boolean
  thought: ReactNode
  tipKey?: number
  height?: number
  bubbleWidth?: number
  bubbleHeight?: number
  className?: string
}

export default function ConductorStage({
  visible,
  thought,
  tipKey = 0,
  height = 110,
  bubbleWidth = 64,
  bubbleHeight = 48,
  className = '',
}: Props) {
  // Mount hidden, then show on the next frame so the entrance transition runs.
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setShown(visible))
    return () => window.cancelAnimationFrame(frame)
  }, [visible])

  const k = height / VIEW.height
  const width = VIEW.width * k
  // Room above his cap for the bubble and the two little dots leading to it.
  const space = bubbleHeight + 30
  const headX = (80 - VIEW.x) * k
  const bubbleLeft = headX + 34

  return (
    <div
      className={`conductor-stage ${shown ? 'is-visible' : ''} ${className}`}
      style={{ width: bubbleLeft + bubbleWidth, height: height + space }}
      aria-hidden="true"
    >
      <svg
        className="stage-figure"
        width={width}
        height={height}
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`}
      >
        <ConductorFigure tipKey={tipKey} lookAtPointer={visible} />
      </svg>
      <span className="thought-dot thought-dot-1" style={{ left: headX + 14, top: bubbleHeight + 16, width: 8, height: 8 }} />
      <span className="thought-dot thought-dot-2" style={{ left: headX + 22, top: bubbleHeight + 1, width: 12, height: 12 }} />
      <div className="thought-bubble" style={{ left: bubbleLeft, top: 0, width: bubbleWidth, height: bubbleHeight }}>
        {thought}
      </div>
    </div>
  )
}
