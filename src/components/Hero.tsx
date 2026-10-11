import { useTranslate } from '../i18n/context'
import { PROFILE } from '../data/profile'
import CvButton from './CvButton'
import { ArrowRight } from './icons'

export default function Hero() {
  const { d } = useTranslate()

  return (
    <section
      id="top"
      className="flex min-h-[86vh] items-center px-4 pt-36 pb-16 sm:px-6 lg:pt-44 print:min-h-0"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-sm tracking-wide text-faint">{d.hero.eyebrow}</p>
        <h1 className="mt-4 font-display text-[3.4rem] leading-[0.95] tracking-tight sm:text-7xl lg:text-[6.5rem] print:mt-1 print:text-[30pt]">
          {d.hero.name}
        </h1>
        {/* Only on paper: the contact line a printed CV needs up top. */}
        <p className="mt-2 hidden font-mono text-[9pt] text-muted print:block">
          {[PROFILE.email, PROFILE.phoneDisplay, PROFILE.linkedinUrl.replace('https://www.', ''), PROFILE.githubDisplay]
            .map((part) => decodeURI(part))
            .join('  ·  ')}
        </p>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl print:mt-3 print:max-w-none print:text-[10.5pt]">
          {d.hero.lead}
        </p>
        <p className="mt-5 max-w-xl border-l-2 border-tram pl-4 text-sm leading-relaxed text-muted print:mt-2 print:max-w-none print:text-[9pt]">
          {d.hero.availability}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 print:hidden">
          <CvButton variant="button" />
          <a href="#contact" className="link-draw inline-flex items-center gap-2 font-medium">
            {d.hero.contactCta}
            <ArrowRight className="h-4.5 w-4.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
