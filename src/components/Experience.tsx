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
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <SectionHeading
          index="03"
          eyebrow="Experience & Education"
          title={
            <>
              The path <span className="text-gradient">so far.</span>
            </>
          }
          intro="A short timeline of where I’ve worked, studied and grown."
        />

        <ol className="mt-14 flex w-full max-w-2xl flex-col items-center">
          {TIMELINE.map((item, i) => {
            const Icon = KIND_ICON[item.kind]
            return (
              <li key={i} className="flex w-full flex-col items-center">
                {/* connector from the previous card */}
                {i > 0 && (
                  <span
                    aria-hidden
                    className="h-10 w-px bg-gradient-to-b from-white/5 via-white/15 to-brand/40"
                  />
                )}

                {/* node */}
                <span className="glass relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-brand">
                  <Icon className="h-5 w-5" />
                  {item.current && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-brand ring-2 ring-slate-950" />
                    </span>
                  )}
                </span>

                {/* card */}
                <div className="glass mt-5 w-full rounded-2xl p-5 text-center transition-all duration-300 hover:border-brand/30 sm:p-6">
                  <div className="flex flex-wrap items-center justify-center gap-2">
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
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
                    {item.desc}
                  </p>

                  {item.tags && (
                    <ul className="mt-4 flex flex-wrap justify-center gap-2">
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
