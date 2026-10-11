import { useEffect, useState } from 'react'

// Index of the last section whose top has scrolled above a line at 35% of the
// viewport height. At the very bottom of the page the last section wins, even
// if it is too short to reach that line.
export function useActiveSection(ids: readonly string[]): number {
  const [active, setActive] = useState(0)

  useEffect(() => {
    let frame = 0

    const pick = () => {
      frame = 0
      const doc = document.documentElement
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 4) {
        setActive(ids.length - 1)
        return
      }
      const line = window.innerHeight * 0.35
      let index = 0
      ids.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) index = i
      })
      setActive(index)
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(pick)
    }

    pick()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids])

  return active
}
