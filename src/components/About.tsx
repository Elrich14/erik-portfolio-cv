import SectionHeading from './SectionHeading'
import { PaletteIcon, LayersIcon } from './icons'
import { useTranslate } from '../i18n/LanguageContext'

export default function About() {
  const { t, tRich } = useTranslate()

  const SOFT_SKILLS = [
    {
      icon: PaletteIcon,
      title: t('about.skill1Title'),
      body: t('about.skill1Body'),
    },
    {
      icon: LayersIcon,
      title: t('about.skill2Title'),
      body: t('about.skill2Body'),
    },
  ]

  return (
    <section id="about" className="relative px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow={t('about.eyebrow')}
          title={
            <>
              {t('about.titleLine1')}{' '}
              <span className="text-gradient">{t('about.titleLine2')}</span>
            </>
          }
        />

        <div className="mt-12 grid items-stretch gap-8 md:grid-cols-5 md:gap-12">

          <div className="md:col-span-2">
            <div className="glass relative mx-auto aspect-[4/5] max-w-[18rem] overflow-hidden rounded-3xl p-2 md:aspect-auto md:h-full md:max-w-none">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <img
                  src="/portrait.jpg"
                  alt={t('about.portraitCaption')}
                  className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"
                />
                <div className="glass absolute inset-x-3 bottom-3 flex items-center justify-center rounded-xl px-3 py-2">
                  <span className="font-mono text-xs text-text-muted">
                    {t('about.portraitCaption')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-lg leading-relaxed text-text-muted">
              {tRich('about.paragraph1')}
            </p>
            <p className="mt-4 leading-relaxed text-text-muted">
              {t('about.paragraph2')}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {SOFT_SKILLS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="glass group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand transition-colors group-hover:bg-brand/20">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-text">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
