import { useTranslate } from '../i18n/LanguageContext'

export default function LanguageToggle() {
  const { lang, toggleLang, t } = useTranslate()

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t('language.switchLabel')}
      className="flex h-10 items-center justify-center rounded-xl border border-border px-3 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:bg-surface-2 hover:text-brand"
    >
      {lang === 'en' ? 'EN' : 'HU'}
    </button>
  )
}
