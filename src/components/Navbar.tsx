import { useEffect, useState } from 'react'
import { MenuIcon, CloseIcon, ArrowUpRight } from './icons'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto max-w-6xl px-4 pt-3 sm:px-6 sm:pt-4">
        <div
          className={`glass flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-5 ${
            scrolled ? 'bg-white/[0.05] shadow-black/40' : ''
          }`}
        >
          {/* Brand */}
          <a
            href="#home"
            className="group flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-pulse-dot absolute inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-slate-100">
              Birkl Erik
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-lg px-3.5 py-2 font-mono text-[0.8rem] uppercase tracking-wider text-slate-400 transition-colors hover:text-brand-soft"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-xl border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-medium text-brand-soft transition-all hover:border-brand/60 hover:bg-brand/20 sm:flex"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </a>

            {/* Hamburger */}
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-200 transition-colors hover:bg-white/5 md:hidden"
            >
              {open ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`glass mt-2 overflow-hidden rounded-2xl transition-all duration-300 md:hidden ${
            open ? 'max-h-80 opacity-100' : 'pointer-events-none max-h-0 border-transparent opacity-0'
          }`}
        >
          <ul className="flex flex-col p-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 font-mono text-sm uppercase tracking-wider text-slate-300 transition-colors hover:bg-white/5 hover:text-brand-soft"
                >
                  {l.label}
                  <ArrowUpRight className="h-4 w-4 opacity-50" />
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-center gap-1.5 rounded-xl border border-brand/30 bg-brand/10 px-4 py-3 text-sm font-medium text-brand-soft"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
