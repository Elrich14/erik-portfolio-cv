import type { ComponentType, SVGProps } from 'react'
import SectionHeading from './SectionHeading'
import { BriefcaseIcon, CapIcon, CheckIcon } from './icons'

interface Item {
  period?: string // date range (work only)
  done?: boolean // finished study → show "Completed" instead of years
  current?: boolean
  role: string
  org: string
  desc: string
  tags?: string[]
}

const WORK: Item[] = [
  {
    period: 'Aug 2024 — Present',
    current: true,
    role: 'Frontend Developer',
    org: 'Vidux Informatikai Kft.',
    desc: 'Building and maintaining a React / TypeScript frontend and a reusable UI component library. Translating Figma designs into pixel-accurate interfaces and integrating backend APIs for live video in the banking sector.',
    tags: ['React', 'TypeScript', 'Figma', 'UI Library', 'REST APIs'],
  },
  {
    period: 'Earlier',
    role: 'Data-entry Accountant',
    org: 'Caballo Verde Kft.',
    desc: 'Accounting data entry and administration — precision, ownership and comfort working with structured data.',
  },
  {
    period: 'Earlier',
    role: 'Bartender / Barback',
    org: 'Sziget Festival',
    desc: 'High-pressure hospitality at one of Europe’s largest festivals — speed, teamwork and grace under a crowd.',
  },
]

const EDUCATION: Item[] = [
  {
    done: true,
    role: 'Computer Engineering, BSc',
    org: 'University of Szeged',
    desc: 'Studied software engineering, algorithms, databases and systems, combined with plenty of hands-on project work.',
    tags: ['Software Engineering', 'Algorithms', 'Databases'],
  },
  {
    done: true,
    role: 'Secondary Diploma · Media',
    org: 'Deák Ferenc Gimnázium, Kispest',
    desc: 'Secondary school diploma with a Media specialization, where an early interest in visual communication took shape.',
  },
]

function TimelineColumn({
  label,
  icon: Icon,
  items,
}: {
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  items: Item[]
}) {
  return (
    <div>
      {/* column header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="glass flex h-11 w-11 items-center justify-center rounded-xl text-brand">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-display text-xl font-semibold text-slate-100">
          {label}
        </h3>
      </div>

      <ol className="relative">
        {/* rail */}
        <span
          aria-hidden
          className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-brand/50 via-white/10 to-transparent"
        />

        {items.map((item, i) => (
          <li key={i} className="relative pl-11 pb-5 last:pb-0">
            {/* node */}
            <span className="glass absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full text-brand">
              <Icon className="h-4 w-4" />
              {item.current && (
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand ring-2 ring-slate-950" />
                </span>
              )}
            </span>

            <div className="glass rounded-2xl p-5 transition-all duration-300 hover:border-brand/30">
              <div className="flex flex-wrap items-center gap-2">
                {item.done ? (
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-brand">
                    <CheckIcon className="h-3.5 w-3.5" />
                    Completed
                  </span>
                ) : (
                  <span className="font-mono text-xs tracking-wide text-brand">
                    {item.period}
                  </span>
                )}
                {item.current && (
                  <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-brand-soft">
                    Now
                  </span>
                )}
              </div>

              <h4 className="mt-2 font-display text-lg font-semibold text-slate-100">
                {item.role}
              </h4>
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
        ))}
      </ol>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Experience & Education"
          title={
            <>
              The path <span className="text-gradient">so far.</span>
            </>
          }
          intro="Two separate tracks — where I’ve worked, and where I’ve studied."
        />

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
          <TimelineColumn label="Work" icon={BriefcaseIcon} items={WORK} />
          <TimelineColumn label="Education" icon={CapIcon} items={EDUCATION} />
        </div>
      </div>
    </section>
  )
}
