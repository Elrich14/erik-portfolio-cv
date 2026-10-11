import { useTranslate } from '../i18n/context'
import { SKILL_GROUPS } from '../data/content'
import SectionHeader from './SectionHeader'

export default function Skills() {
  const { d } = useTranslate()

  const translated: Partial<Record<string, string[]>> = {
    methodology: d.skills.methodologyItems,
    spoken: d.skills.spokenItems,
  }

  return (
    <section id="skills" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="02" title={d.skills.title} intro={d.skills.intro} />
        <dl className="grid gap-x-12 gap-y-7 sm:grid-cols-2 print:grid-cols-2 print:gap-y-1.5">
          {SKILL_GROUPS.map(({ key, items }) => (
            <div key={key} className="border-t border-hair pt-4 print:pt-1.5">
              <dt className="font-mono text-xs tracking-wide text-faint">{d.skills.groups[key]}</dt>
              <dd className="mt-2 leading-relaxed print:mt-0.5">{(items ?? translated[key] ?? []).join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
