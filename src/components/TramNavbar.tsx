import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { TransitionEvent } from 'react'
import { useTranslate } from '../i18n/context'
import { useConductor } from '../conductor/context'
import type { StopScene } from '../conductor/context'
import { useActiveSection } from '../hooks/useActiveSection'
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMedia'
import { STOP_IDS } from '../data/stops'
import type { StopId } from '../data/stops'
import Tram from './art/Tram'
import { TRAM } from './art/tramGeometry'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'
import { MenuIcon, CloseIcon } from './icons'

const LAST = STOP_IDS.length - 1
const BUBBLE_MS = 3500

// Stops where the conductor gets off the tram and waits in the section.
const STOP_SCENES: Partial<Record<StopId, StopScene>> = {
  projects: 'laptop',
  contact: 'contact',
}

// `rail` is the y of the rail inside the header (92px desktop, 72px mobile);
// the tram is scaled so its pantograph just touches the wire at y≈7, and on
// desktop the stop labels still fit under the rail.
const GEOMETRY = {
  desktop: { scale: 0.66, rail: 66 },
  mobile: { scale: 0.55, rail: 56 },
}

export default function TramNavbar() {
  const { d, lang } = useTranslate()
  const { location, tramTipKey, tipOnTram, setStopScene } = useConductor()
  const active = useActiveSection(STOP_IDS)
  const desktop = useMediaQuery('(min-width: 1024px)')
  const reducedMotion = usePrefersReducedMotion()
  const { scale, rail } = desktop ? GEOMETRY.desktop : GEOMETRY.mobile

  const headerRef = useRef<HTMLElement>(null)
  const streetRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const [street, setStreet] = useState({ left: 0, width: 0 })
  const [stop, setStop] = useState(active)
  const [moving, setMoving] = useState(false)
  const [duration, setDuration] = useState(0)
  const [bubble, setBubble] = useState(false)
  const [hover, setHover] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bubblePos, setBubblePos] = useState({ left: 0, tail: 0 })
  const machine = useRef<{ stop: number; moving: boolean; scene: StopScene | null; mountedAt: number }>({
    stop: active,
    moving: false,
    scene: null,
    mountedAt: 0,
  })

  useLayoutEffect(() => {
    const el = streetRef.current
    if (!el) return
    const measure = () => {
      const rect = el.getBoundingClientRect()
      setStreet({ left: rect.left, width: rect.width })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [desktop])

  // Stops are spread so the tram (platform at the back, headlight at the front)
  // never sticks out of the street at the first or last stop.
  const stopX = useCallback(
    (k: number) => {
      const back = (TRAM.center - TRAM.rear) * scale + 6
      const front = (TRAM.front - TRAM.center) * scale + 10
      const span = Math.max(0, street.width - back - front)
      return back + (span * k) / LAST
    },
    [scale, street.width],
  )

  const arrive = useCallback(
    (k: number) => {
      const m = machine.current
      m.moving = false
      setMoving(false)
      setDuration(0)
      setBubble(true)
      const scene = STOP_SCENES[STOP_IDS[k]] ?? null
      if (scene && m.scene !== scene) {
        m.scene = scene
        setStopScene(scene)
      }
    },
    [setStopScene],
  )

  useEffect(() => {
    machine.current.mountedAt = performance.now()
    const intro = window.setTimeout(() => setBubble(true), 900)
    return () => window.clearTimeout(intro)
  }, [])

  // Departure: the conductor gets back on if he was off at the laptop or the
  // contact form, tips his cap, then the tram drives. A new target while
  // driving just retargets.
  useEffect(() => {
    const m = machine.current
    if (active === m.stop) return
    const timers: number[] = []
    const instant =
      reducedMotion || street.width === 0 || performance.now() - m.mountedAt < 700

    const leaveScene = () => {
      if (m.scene) {
        m.scene = null
        setStopScene(null)
        return true
      }
      return false
    }

    const drive = () => {
      const distance = Math.abs(active - m.stop)
      m.stop = active
      setStop(active)
      if (instant) {
        arrive(active)
        return
      }
      m.moving = true
      setDuration(Math.min(1.8, 0.5 + 0.35 * distance))
      setMoving(true)
    }

    setBubble(false)
    if (m.moving || instant) {
      leaveScene()
      drive()
      return
    }
    const delay = leaveScene() ? 450 : 0
    timers.push(
      window.setTimeout(() => {
        tipOnTram()
        timers.push(window.setTimeout(drive, 380))
      }, delay),
    )
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [active, arrive, reducedMotion, setStopScene, street.width, tipOnTram])

  useEffect(() => {
    if (!bubble) return
    const timer = window.setTimeout(() => setBubble(false), BUBBLE_MS)
    return () => window.clearTimeout(timer)
  }, [bubble, stop])

  useLayoutEffect(() => {
    const el = bubbleRef.current
    if (!el || street.width === 0) return
    const x = street.left + stopX(stop)
    const width = el.offsetWidth
    const left = Math.max(8, Math.min(window.innerWidth - width - 8, x - width / 2))
    setBubblePos({ left, tail: Math.max(10, Math.min(width - 22, x - left - 6)) })
  }, [stop, lang, street, stopX])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [menuOpen])

  useEffect(() => {
    if (desktop) setMenuOpen(false)
  }, [desktop])

  const onTramTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === 'left' && e.target === e.currentTarget) arrive(machine.current.stop)
  }

  const showBubble = (bubble || hover) && !moving && !menuOpen && street.width > 0
  const StreetTag = desktop ? 'nav' : 'div'

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-hair bg-bar lg:h-[92px] print:hidden"
    >
      <div className="mx-auto flex h-full max-w-6xl items-stretch gap-3 px-4 sm:px-6 lg:gap-8">
        <a
          href="#top"
          className="hidden shrink-0 items-center font-display text-[1.35rem] tracking-tight lg:flex"
        >
          {d.nav.brand}
        </a>

        <StreetTag
          aria-label={desktop ? d.nav.label : undefined}
          aria-hidden={desktop ? undefined : true}
          className="relative min-w-0 flex-1"
        >
          <div
            ref={streetRef}
            className={`absolute inset-0 ${desktop ? '' : 'cursor-pointer'}`}
            onClick={desktop ? undefined : () => setMenuOpen(true)}
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-[7px] border-t border-ink/45" />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 border-t-2 border-ink"
              style={{ top: rail - 1 }}
            />
            {street.width > 0 &&
              STOP_IDS.map((id, k) =>
                desktop ? (
                  <a
                    key={id}
                    href={`#${id}`}
                    aria-current={k === active ? 'location' : undefined}
                    className="group absolute flex -translate-x-1/2 flex-col items-center"
                    style={{ left: stopX(k), top: rail - 8 }}
                  >
                    <span className="block h-4 w-4 rounded-full border-2 border-ink bg-bar transition-colors group-hover:bg-tram group-aria-[current=location]:bg-tram" />
                    <span
                      className={
                        k === 0
                          ? 'sr-only'
                          : 'link-draw mt-1 font-mono text-[11px] leading-none text-faint transition-colors group-hover:text-ink group-aria-[current=location]:text-ink'
                      }
                    >
                      {d.nav.stops[id]}
                    </span>
                  </a>
                ) : (
                  <span
                    key={id}
                    aria-hidden="true"
                    className={`absolute block h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-ink ${
                      k === active ? 'bg-tram' : 'bg-bar'
                    }`}
                    style={{ left: stopX(k), top: rail - 5 }}
                  />
                ),
              )}
            {street.width > 0 && (
              <div
                className={`absolute ${moving ? 'tram-moving' : ''}`}
                style={{
                  left: stopX(stop) - TRAM.center * scale,
                  top: rail - TRAM.rail * scale,
                  transition: `left ${duration}s cubic-bezier(.45,0,.2,1)`,
                }}
                onTransitionEnd={onTramTransitionEnd}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <Tram scale={scale} conductorOnBoard={location === 'tram'} tipKey={tramTipKey} />
              </div>
            )}
          </div>
        </StreetTag>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="stop-menu"
          aria-label={menuOpen ? d.nav.closeMenu : d.nav.openMenu}
          className="my-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-ink lg:hidden"
        >
          {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      <div
        ref={bubbleRef}
        aria-hidden="true"
        className="tram-bubble"
        data-hidden={!showBubble}
        style={{ left: bubblePos.left }}
      >
        <div className="font-display text-xl leading-tight">{d.nav.stops[STOP_IDS[stop]]}</div>
        <div className="mt-1 font-mono text-[11px] text-faint">
          {stop < LAST ? `${d.nav.nextStop} ${d.nav.stops[STOP_IDS[stop + 1]]}` : d.nav.lastStop}
        </div>
        <span className="tram-bubble-tail" style={{ left: bubblePos.tail }} />
      </div>

      {menuOpen && !desktop && (
        <div id="stop-menu" className="absolute inset-x-0 top-full border-b border-hair bg-bar px-4 pb-5 sm:px-6">
          <nav aria-label={d.nav.label}>
            <ul>
              {STOP_IDS.map((id, k) => (
                <li key={id} className="border-b border-hair last:border-b-0">
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={k === active ? 'location' : undefined}
                    className="group flex items-center gap-3 py-3 font-display text-2xl"
                  >
                    <span className="block h-3 w-3 shrink-0 rounded-full border-2 border-ink group-aria-[current=location]:bg-tram" />
                    {d.nav.stops[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 flex gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}
