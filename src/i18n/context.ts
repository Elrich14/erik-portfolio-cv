import { createContext, useContext } from 'react'
import en from './en.json'
import hu from './hu.json'

export type Lang = 'en' | 'hu'
export type Dict = typeof en

// hu.json is checked against the shape of en.json, so a missing key fails the build.
export const DICTS: Record<Lang, Dict> = { en, hu }

export interface LanguageApi {
  lang: Lang
  d: Dict
  toggleLang: () => void
}

export const LanguageContext = createContext<LanguageApi | null>(null)

export function useTranslate(): LanguageApi {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useTranslate must be used within a LanguageProvider')
  }
  return ctx
}
