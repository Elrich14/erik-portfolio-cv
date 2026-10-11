import { flushSync } from 'react-dom'
import type { MouseEvent } from 'react'
import { useTheme } from '../theme/context'
import { useTranslate } from '../i18n/context'
import { SunIcon, MoonIcon } from './icons'

type DocumentWithTransitions = Document & {
  startViewTransition?: (update: () => void) => unknown
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { d } = useTranslate()
  const next = theme === 'dark' ? 'light' : 'dark'

  // The new theme spreads out in a circle from the button (View Transitions API);
  // browsers without it, or visitors who prefer less motion, get an instant switch.
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const doc = document as DocumentWithTransitions
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!doc.startViewTransition || reduceMotion) {
      setTheme(next)
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const root = document.documentElement
    root.style.setProperty('--vt-x', `${x}px`)
    root.style.setProperty('--vt-y', `${y}px`)
    root.style.setProperty('--vt-r', `${radius}px`)
    doc.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })
  }

  const label = theme === 'dark' ? d.theme.toLight : d.theme.toDark

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink transition-colors hover:bg-ink hover:text-bg"
    >
      {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  )
}
