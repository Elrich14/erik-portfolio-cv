import { useTheme } from '../theme/ThemeContext'
import { useTranslate } from '../i18n/LanguageContext'
import { SunIcon, MoonIcon } from './icons'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslate()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t(theme === 'dark' ? 'theme.toggleToLight' : 'theme.toggleToDark')}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-muted transition-colors hover:bg-surface-2 hover:text-brand"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-4.5 w-4.5" />
      ) : (
        <MoonIcon className="h-4.5 w-4.5" />
      )}
    </button>
  )
}
