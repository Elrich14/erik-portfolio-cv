import { useTranslate } from '../i18n/context'
import SectionHeader from './SectionHeader'

export default function About() {
  const { d } = useTranslate()

  return (
    <section id="about" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="01" title={d.about.title} />
        {/* The portrait column is sized so the photo is about as tall as the text beside it. */}
        <div className="grid items-start gap-8 md:grid-cols-[260px_minmax(0,1fr)] md:gap-14 print:grid-cols-[28mm_minmax(0,1fr)] print:gap-6">
          <img
            src="/portrait.jpg"
            alt={d.about.portraitAlt}
            width={958}
            height={1200}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full max-w-[15rem] rounded-xl border-2 border-ink object-cover object-[center_35%] md:max-w-none print:rounded-md print:border"
          />
          <div className="space-y-5 text-lg leading-relaxed sm:text-xl sm:leading-relaxed print:space-y-2 print:text-[10pt]">
            {d.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
