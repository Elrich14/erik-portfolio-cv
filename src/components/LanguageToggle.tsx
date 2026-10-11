import { useTranslate } from '../i18n/context'

// Shows the language it switches to, so the label always answers "what happens if I click".
export default function LanguageToggle() {
  const { d, toggleLang } = useTranslate()

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={d.language.switchTo}
      title={d.language.switchTo}
      className="flex h-10 min-w-10 items-center justify-center rounded-lg border-2 border-ink px-2.5 font-mono text-xs font-medium tracking-wider transition-colors hover:bg-ink hover:text-bg"
    >
      {d.language.code}
    </button>
  )
}
