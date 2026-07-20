import type { ComponentType, SVGProps } from 'react'
import SectionHeading from './SectionHeading'
import { BriefcaseIcon, CapIcon } from './icons'

interface Item {
  period: string
  current?: boolean
  role: string
  org: string
  kind: 'work' | 'edu'
  desc: string
  tags?: string[]
}

const TIMELINE: Item[] = [
  {
    period: 'Aug 2024 — Present',
    current: true,
    role: 'Frontend Developer',
    org: 'Vidux Informatikai Kft.',
    kind: 'work',
    desc: 'Building and maintaining a React / TypeScript frontend and a reusable UI component library. Translating Figma designs into pixel-accurate interfaces and integrating backend APIs for live video in the banking sector.',
    tags: ['React', 'TypeScript', 'Figma', 'UI Library', 'REST APIs'],
  },
  {
    period: '2021 — Present',
    current: true,
    role: 'Computer Engineering, BSc',
    org: 'University of Szeged',
    kind: 'edu',
    desc: 'Foundations in software engineering, algorithms, databases and systems — combined with hands-on project work.',
    tags: ['Software Engineering', 'Algorithms', 'Databases'],
  },
  {
    period: '2017 — 2021',
    role: 'Secondary Diploma · Media',
    org: 'Deák Ferenc Gimnázium, Kispest',
    kind: 'edu',
    desc: 'Secondary school diploma with a Media specialization, where an early interest in visual communication took shape.',
  },
  {
    period: 'Earlier',
    role: 'Data-entry Accountant',
    org: 'Caballo Verde Kft.',
    kind: 'work',
    desc: 'Accounting data entry and administration — precision, ownership and comfort working with structured data.',
  },
  {
    period: 'Earlier',
    role: 'Bartender / Barback',
    org: 'Sziget Festival',
    kind: 'work',
    desc: 'High-pressure hospitality at one of Europe’s largest festivals — speed, teamwork and grace under a crowd.',
  },
]

const KIND_ICON: Record<Item['kind'], ComponentType<SVGProps<SVGSVGElement>>> = {
  work: BriefcaseIcon,
  edu: CapIcon,
}

export default function Experience() {
  return (
    <section id="experience" className="relative px-4 py-24 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Experience & Education"
          title={
            <>
              The path{' '}
              <span className="text-gradient">so far.</span>
            </>
          }
          intro="A short timeline of where I’ve worked, studied and grown."
        />

        <ol className="relative mt-12 max-w-3xl">
          {/* rail */}
          <span
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-brand/50 via-white/10 to-transparent"
          />

          {TIMELINE.map((item, i) => {
            const Icon = KIND_ICON[item.kind]
            return (
              <li key={i} className="relative pl-14 pb-8 last:pb-0">
                {/* node */}
                <span className="glass absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full text-brand">
                  <Icon className="h-5 w-5" />
                  {item.current && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-brand ring-2 ring-slate-950" />
                    </span>
                  )}
                </span>

                <div className="glass rounded-2xl p-5 transition-all duration-300 hover:border-brand/30 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs tracking-wide text-brand">
                      {item.period}
                    </span>
                    {item.current && (
                      <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-brand-soft">
                        Now
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 font-display text-xl font-semibold text-slate-100">
                    {item.role}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-slate-300">
                    {item.org}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {item.desc}
                  </p>

                  {item.tags && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.7rem] text-slate-400"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
