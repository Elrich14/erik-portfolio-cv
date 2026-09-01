import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import en from './en.json'
import hu from './hu.json'

export type Lang = 'en' | 'hu'

const DICTS: Record<Lang, typeof en> = { en, hu }

interface LanguageContextValue {
  lang: Lang
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLang(): Lang {
  try {
    const stored = window.localStorage.getItem('lang')
    if (stored === 'en' || stored === 'hu') {
      document.documentElement.lang = stored
      return stored
    }
  } catch {
    // localStorage unavailable (private browsing, blocked storage, etc.)
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem('lang', lang)
    } catch {
      // ignore
    }
  }, [lang])

  const toggleLang = () => {
    setLang((current) => (current === 'en' ? 'hu' : 'en'))
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

function resolvePath(dict: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((node, key) => {
    if (node && typeof node === 'object' && key in node) {
      return (node as Record<string, unknown>)[key]
    }
    return undefined
  }, dict)
}

interface Translate {
  lang: Lang
  toggleLang: () => void
  t: (key: string) => string
  tList: (key: string) => string[]
  tRich: (key: string) => ReactNode
}

export function useTranslate(): Translate {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useTranslate must be used within a LanguageProvider')
  }

  const t = (key: string): string => {
    const value = resolvePath(DICTS[ctx.lang], key)
    if (typeof value === 'string') return value
    const fallback = resolvePath(DICTS.en, key)
    if (typeof fallback === 'string') return fallback
    return key
  }

  const tList = (key: string): string[] => {
    const value = resolvePath(DICTS[ctx.lang], key)
    if (Array.isArray(value)) return value as string[]
    const fallback = resolvePath(DICTS.en, key)
    return Array.isArray(fallback) ? (fallback as string[]) : []
  }

  const tRich = (key: string): ReactNode => {
    const text = t(key)
    const parts = text.split(/<em>(.*?)<\/em>/g)
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className="text-text">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return { lang: ctx.lang, toggleLang: ctx.toggleLang, t, tList, tRich }
}
