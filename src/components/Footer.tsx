import { GithubIcon, LinkedinIcon, MailIcon, ArrowUp } from './icons'
import { useTranslate } from '../i18n/LanguageContext'

const SOCIALS = [
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/erik-andrás-birkl-7b4240306', label: 'LinkedIn' },
  { icon: GithubIcon, href: 'https://github.com/Elrich14', label: 'GitHub' },
  { icon: MailIcon, href: 'mailto:elrich.020114@gmail.com', label: 'Email' },
]

export default function Footer() {
  const { t } = useTranslate()

  return (
    <footer className="relative px-4 pb-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="glass flex flex-col items-center gap-6 rounded-3xl px-6 py-8 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="h-2 w-2 rounded-full bg-brand" />
              <span className="font-display text-lg font-semibold text-text">
                Birkl Erik András
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-text-faint">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2 text-text-muted transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
            <a
              href="#home"
              aria-label={t('footer.backToTop')}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand transition-all hover:-translate-y-0.5 hover:bg-brand/20"
            >
              <ArrowUp className="h-5 w-5" />
            </a>
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-xs text-text-faint">
          © {new Date().getFullYear()} Birkl Erik András · {t('footer.copyrightSuffix')}
        </p>
      </div>
    </footer>
  )
}
