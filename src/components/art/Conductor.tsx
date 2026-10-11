import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { subscribePointer } from '../../conductor/pointer'
import { usePrefersReducedMotion } from '../../hooks/useMedia'

// The conductor is drawn in his own 160×160 coordinate space (head centre at
// 80,54, feet at y=158). Parents place him with an SVG transform or viewBox.
const INK = '#1b1a17'
const SKIN = '#f2cba6'
const NAVY = 'var(--conductor-navy)'
const EYE_ORIGIN = { x: 80, y: 55 }

function useLookAtPointer(lookRef: RefObject<SVGGElement | null>, enabled: boolean) {
  useEffect(() => {
    const look = lookRef.current
    if (!look) return
    if (!enabled) {
      look.removeAttribute('transform')
      return
    }
    return subscribePointer((x, y) => {
      const parent = look.parentNode as SVGGraphicsElement | null
      const ctm = parent?.getScreenCTM()
      if (!ctm) return
      const eyes = new DOMPoint(EYE_ORIGIN.x, EYE_ORIGIN.y).matrixTransform(ctm)
      const dx = x - eyes.x
      const dy = y - eyes.y
      const length = Math.hypot(dx, dy) || 1
      look.setAttribute(
        'transform',
        `translate(${((1.8 * dx) / length).toFixed(2)} ${((1.6 * dy) / length).toFixed(2)})`,
      )
    })
  }, [lookRef, enabled])
}

// Re-runs the cap-tip animation every time `tipKey` changes (0 = never).
function useCapTip(rootRef: RefObject<SVGGElement | null>, tipKey: number) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || !tipKey) return
    root.classList.remove('is-tipping')
    void root.getBoundingClientRect()
    root.classList.add('is-tipping')
    const timer = window.setTimeout(() => root.classList.remove('is-tipping'), 1300)
    return () => window.clearTimeout(timer)
  }, [rootRef, tipKey])
}

function Face({ lookRef, eyesDown = false }: { lookRef?: RefObject<SVGGElement | null>; eyesDown?: boolean }) {
  return (
    <>
      <circle cx="60" cy="57" r="4.5" fill={SKIN} stroke={INK} strokeWidth="2.5" />
      <circle cx="100" cy="57" r="4.5" fill={SKIN} stroke={INK} strokeWidth="2.5" />
      <circle cx="80" cy="54" r="20" fill={SKIN} stroke={INK} strokeWidth="2.5" />
      <circle cx="69" cy="62" r="3.2" fill="#eda68c" />
      <circle cx="91" cy="62" r="3.2" fill="#eda68c" />
      <g ref={lookRef} transform={eyesDown ? 'translate(0 1.5)' : undefined}>
        <g className="c-eyes">
          <circle cx="73" cy="55" r="2.3" fill={INK} />
          <circle cx="87" cy="55" r="2.3" fill={INK} />
        </g>
      </g>
      <ellipse cx="80" cy="60" rx="3" ry="2.6" fill="#e6af8c" stroke={INK} strokeWidth="1.5" />
      <path
        d="M80 63.5 C76 61 69 61.5 66 66 C70 66.5 75 65.5 80 65.5 C85 65.5 90 66.5 94 66 C91 61.5 84 61 80 63.5 Z"
        fill="#4a3426"
        stroke={INK}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M76.5 69 Q80 71 83.5 69" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  )
}

function Cap() {
  return (
    <g className="c-cap">
      <path
        d="M60 40 L100 40 L106 26 C106 22 104 20 100 20 L60 20 C56 20 54 22 54 26 Z"
        fill={NAVY}
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M56.6 32 L103.4 32 L100 40 L60 40 Z" fill="#1f283d" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="80" cy="26.5" r="3.4" fill="#f2c230" stroke={INK} strokeWidth="1.5" />
      <path d="M58 40 Q80 47 102 40 L100.5 44.5 Q80 52 59.5 44.5 Z" fill={INK} />
    </g>
  )
}

interface FigureProps {
  tipKey?: number
  lookAtPointer?: boolean
}

export function ConductorFigure({ tipKey = 0, lookAtPointer = true }: FigureProps) {
  const rootRef = useRef<SVGGElement>(null)
  const lookRef = useRef<SVGGElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useCapTip(rootRef, reducedMotion ? 0 : tipKey)
  useLookAtPointer(lookRef, lookAtPointer && !reducedMotion)

  return (
    <g ref={rootRef} className="conductor">
      <rect x="61" y="150" width="17" height="8" rx="4" fill={INK} />
      <rect x="82" y="150" width="17" height="8" rx="4" fill={INK} />
      <rect x="65" y="118" width="13" height="36" rx="3" fill={NAVY} stroke={INK} strokeWidth="2.5" />
      <rect x="82" y="118" width="13" height="36" rx="3" fill={NAVY} stroke={INK} strokeWidth="2.5" />
      <path d="M60 84 L52 115" stroke={INK} strokeWidth="14" strokeLinecap="round" />
      <path d="M60 84 L52 115" stroke={NAVY} strokeWidth="9" strokeLinecap="round" />
      <circle cx="51" cy="120" r="5.5" fill={SKIN} stroke={INK} strokeWidth="2.5" />
      <rect x="56" y="74" width="48" height="52" rx="13" fill={NAVY} stroke={INK} strokeWidth="2.5" />
      <path d="M71 75 L80 88 L89 75 Z" fill="#fbf8f1" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M80 88 L80 124" stroke={INK} strokeWidth="1.5" />
      <g fill="#f2c230" stroke={INK} strokeWidth="1.2">
        <circle cx="85.5" cy="97" r="2.4" />
        <circle cx="85.5" cy="107" r="2.4" />
        <circle cx="85.5" cy="117" r="2.4" />
      </g>
      <path d="M62 78 L101 111" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      <path d="M62 78 L101 111" stroke="#7e5331" strokeWidth="3" strokeLinecap="round" />
      <rect x="96" y="106" width="20" height="17" rx="4" fill="#9c6a3e" stroke={INK} strokeWidth="2.5" />
      <path d="M96 112 L116 112" stroke={INK} strokeWidth="1.5" />
      <circle cx="106" cy="112" r="1.8" fill="#f2c230" />
      <Face lookRef={lookRef} />
      <Cap />
      {/* Drawn pointing down from the shoulder; CSS rotates it into place. */}
      <g className="c-arm">
        <path d="M0 0 L0 36" stroke={INK} strokeWidth="14" strokeLinecap="round" />
        <path d="M0 0 L0 36" stroke={NAVY} strokeWidth="9" strokeLinecap="round" />
        <circle cx="0" cy="41" r="5.5" fill={SKIN} stroke={INK} strokeWidth="2.5" />
      </g>
    </g>
  )
}

// Just the head and cap, for when he is sitting behind the laptop.
export function ConductorHead() {
  return (
    <g className="conductor">
      <Face eyesDown />
      <Cap />
    </g>
  )
}
