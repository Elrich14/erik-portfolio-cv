import { useTranslate } from '../i18n/context'

export default function Footer() {
  const { d } = useTranslate()

  return (
    <footer className="border-t border-hair px-4 py-10 sm:px-6 print:hidden">
      <p className="mx-auto max-w-6xl font-mono text-xs text-faint">
        © {new Date().getFullYear()} {d.hero.name} · {d.footer.builtWith}
      </p>
    </footer>
  )
}
