import { useTranslate } from '../i18n/context'
import { useConductor } from '../conductor/context'
import { KERIAN } from '../data/content'
import SectionHeader from './SectionHeader'
import LaptopScene from './art/LaptopScene'
import { GithubIcon, ArrowUpRight } from './icons'

export default function Projects() {
  const { d } = useTranslate()
  const { location } = useConductor()
  const k = d.projects.kerian

  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="03" title={d.projects.title} />
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_180px] lg:gap-8">
          <article className="rounded-xl border-2 border-ink bg-paper p-6 sm:p-8 print:rounded-md print:border print:p-4">
            <p className="font-mono text-xs tracking-wide text-faint">{k.meta}</p>
            <h3 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl print:mt-1 print:text-[14pt]">{k.name}</h3>
            <p className="mt-1 text-muted">{k.subtitle}</p>
            <p className="mt-5 max-w-3xl leading-relaxed">{k.description}</p>

            <dl className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2 print:mt-3 print:grid-cols-2 print:gap-y-2">
              {k.highlights.map((highlight) => (
                <div key={highlight.title} className="border-t border-hair pt-3">
                  <dt className="font-medium">{highlight.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{highlight.body}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-7 font-mono text-xs leading-relaxed text-faint">{KERIAN.stack.join(' · ')}</p>

            <a
              href={KERIAN.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw mt-6 inline-flex items-center gap-2 font-medium print:hidden"
            >
              <GithubIcon className="h-4.5 w-4.5" />
              {k.repo}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className="hidden font-mono text-[8.5pt] print:mt-2 print:block">{KERIAN.repo.replace('https://', '')}</p>
          </article>
          <div className="flex justify-end lg:block print:hidden">
            <LaptopScene occupied={location === 'laptop'} />
          </div>
        </div>
      </div>
    </section>
  )
}
