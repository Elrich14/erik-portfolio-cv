import { useState } from 'react'
import type { ComponentType, SVGProps } from 'react'
import SectionHeading from './SectionHeading'
import Modal from './Modal'
import { BriefcaseIcon, CapIcon, CheckIcon, ArrowUpRight } from './icons'

interface StackGroup {
  group: string
  items: string[]
}

interface Detail {
  subtitle: string
  bullets: string[]
  stack: StackGroup[]
}

interface Item {
  period?: string
  done?: boolean
  current?: boolean
  role: string
  org: string
  desc: string
  tags?: string[]
  detail?: Detail
}

const WORK: Item[] = [
  {
    period: 'Aug 2024 — Present',
    current: true,
    role: 'Frontend Developer',
    org: 'Vidux Informatikai Kft.',
    desc: 'Building and maintaining a React / TypeScript frontend and a reusable UI component library. Translating Figma designs into pixel-accurate interfaces and integrating backend APIs for live video in the banking sector.',
    tags: ['React', 'TypeScript', 'Figma', 'UI Library', 'REST APIs'],
    detail: {
      subtitle:
        'IP-based security systems & video recording solutions for the banking sector.',
      bullets: [
        'Building web frontends with React / TypeScript and JavaScript, continuously improving the user experience and interface design.',
        'Collaborating closely with designers through Figma to make sure every UI layout meets the exact specifications.',
        'Participating in agile development processes, improving project delivery and overall team efficiency.',
        'Integrated the frontend with backend APIs to display live video streams, device status, analytics dashboards and alarm handling.',
        'Developed and maintained a private npm package of shared UI components — ensuring design consistency and accelerating development across multiple company projects.',
      ],
      stack: [
        { group: 'Languages & Core', items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'] },
        { group: 'Frameworks & Libraries', items: ['React', 'Material UI', 'Jest'] },
        {
          group: 'Infrastructure & Tools',
          items: ['Git', 'Jenkins', 'SonarQube', 'Keycloak', 'RabbitMQ', 'Active Directory'],
        },
        {
          group: 'AI-Assisted Development',
          items: ['Claude Code', 'GitHub Copilot', 'ChatGPT', 'Gemini'],
        },
        { group: 'Methodology', items: ['Agile (Scrum / Kanban)'] },
      ],
    },
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
    role: 'Computer Science Engineering, BSc',
    org: 'University of Szeged',
    desc: 'Studied software engineering, algorithms, databases and systems, combined with plenty of hands-on project work.',
    tags: ['Software Engineering', 'Algorithms', 'Databases'],
  },
  {
    done: true,
    role: 'High School · Media',
    org: 'Deák Ferenc Gimnázium, Kispest',
    desc: 'High school with a Media specialization, where an early interest in visual communication took shape.',
  },
]

function PeriodBadge({ item }: { item: Item }) {
  return (
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
  )
}

function CardBody({ item }: { item: Item }) {
  return (
    <>
      <PeriodBadge item={item} />
      <h4 className="mt-2 font-display text-lg font-semibold text-slate-100">
        {item.role}
      </h4>
      <p className="mt-0.5 text-sm font-medium text-slate-300">{item.org}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.desc}</p>
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
    </>
  )
}

function TimelineColumn({
  label,
  icon: Icon,
  items,
  onOpen,
}: {
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  items: Item[]
  onOpen: (item: Item) => void
}) {
  return (
    <div>

      <div className="mb-6 flex items-center gap-3">
        <span className="glass flex h-11 w-11 items-center justify-center rounded-xl text-brand">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-display text-xl font-semibold text-slate-100">
          {label}
        </h3>
      </div>

      <ol className="relative">

        <span
          aria-hidden
          className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-brand/50 via-white/10 to-transparent"
        />

        {items.map((item, i) => (
          <li key={i} className="relative pl-11 pb-5 last:pb-0">

            <span className="glass absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full text-brand">
              <Icon className="h-4 w-4" />
              {item.current && (
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand ring-2 ring-slate-950" />
                </span>
              )}
            </span>

            {item.detail ? (
              <button
                type="button"
                onClick={() => onOpen(item)}
                className="glass group block w-full cursor-pointer rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 focus:outline-none focus-visible:border-brand/60"
              >
                <CardBody item={item} />
                <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-brand transition-colors group-hover:text-brand-soft">
                  View full details
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            ) : (
              <div className="glass rounded-2xl p-5 transition-all duration-300 hover:border-brand/30">
                <CardBody item={item} />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Experience() {
  const [detail, setDetail] = useState<Item | null>(null)

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
          intro="Two separate tracks — where I’ve worked, and where I’ve studied. Tap a highlighted role for the full story."
        />

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
          <TimelineColumn label="Work" icon={BriefcaseIcon} items={WORK} onOpen={setDetail} />
          <TimelineColumn label="Education" icon={CapIcon} items={EDUCATION} onOpen={setDetail} />
        </div>
      </div>

      <Modal
        open={detail !== null}
        onClose={() => setDetail(null)}
        labelledBy="exp-detail-title"
      >
        {detail?.detail && (
          <div className="pr-10">
            <div className="flex items-start gap-4">
              <span className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-brand">
                <BriefcaseIcon className="h-6 w-6" />
              </span>
              <div>
                <PeriodBadge item={detail} />
                <h3
                  id="exp-detail-title"
                  className="mt-1.5 font-display text-2xl font-semibold text-slate-100"
                >
                  {detail.role}
                </h3>
                <p className="text-sm font-medium text-slate-300">{detail.org}</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              {detail.detail.subtitle}
            </p>

            <h4 className="eyebrow mt-7">What I did</h4>
            <ul className="mt-3 space-y-2.5">
              {detail.detail.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <h4 className="eyebrow mt-7">Tech stack used</h4>
            <div className="mt-3 space-y-3">
              {detail.detail.stack.map(({ group, items }) => (
                <div key={group}>
                  <p className="font-mono text-[0.7rem] uppercase tracking-wider text-slate-500">
                    {group}
                  </p>
                  <ul className="mt-1.5 flex flex-wrap gap-2">
                    {items.map((t) => (
                      <li
                        key={t}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.7rem] text-slate-300"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
