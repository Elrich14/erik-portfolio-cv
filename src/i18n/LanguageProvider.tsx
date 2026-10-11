import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { DICTS, LanguageContext } from './context'
import type { Lang } from './context'

function getInitialLang(): Lang {
  try {
    const stored = window.localStorage.getItem('lang')
    if (stored === 'en' || stored === 'hu') return stored
  } catch {
    // localStorage unavailable (private browsing, blocked storage, etc.)
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang)
  const d = DICTS[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = d.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', d.meta.description)
    try {
      window.localStorage.setItem('lang', lang)
    } catch {
      // ignore
    }
  }, [lang, d])

  const value = useMemo(
    () => ({
      lang,
      d,
      toggleLang: () => setLang((current) => (current === 'en' ? 'hu' : 'en')),
    }),
    [lang, d],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
