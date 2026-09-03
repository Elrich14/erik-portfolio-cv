import { useState } from 'react'
import type { ComponentType, SVGProps } from 'react'
import SectionHeading from './SectionHeading'
import Modal from './Modal'
import { BriefcaseIcon, CapIcon, CheckIcon, ArrowUpRight } from './icons'
import { useTranslate } from '../i18n/LanguageContext'

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

function PeriodBadge({
  item,
  completedLabel,
  nowLabel,
}: {
  item: Item
  completedLabel: string
  nowLabel: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {item.done ? (
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-brand-soft">
          <CheckIcon className="h-3.5 w-3.5" />
          {completedLabel}{item.period ? ` · ${item.period}` : ''}
        </span>
      ) : (
        <span className="font-mono text-xs tracking-wide text-brand-soft">
          {item.period}
        </span>
      )}
      {item.current && (
        <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-brand-soft">
          {nowLabel}
        </span>
      )}
    </div>
  )
}

function CardBody({
  item,
  completedLabel,
  nowLabel,
}: {
  item: Item
  completedLabel: string
  nowLabel: string
}) {
  return (
    <>
      <PeriodBadge item={item} completedLabel={completedLabel} nowLabel={nowLabel} />
      <h4 className="mt-2 font-display text-lg font-semibold text-text">
        {item.role}
      </h4>
      <p className="mt-0.5 text-sm font-medium text-text-muted">{item.org}</p>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">{item.desc}</p>
      {item.tags && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-lg border border-border bg-surface-2 px-2.5 py-1 font-mono text-[0.7rem] text-text-muted"
            >
              {tag}
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
  completedLabel,
  nowLabel,
  viewFullDetails,
}: {
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  items: Item[]
  onOpen: (item: Item) => void
  completedLabel: string
  nowLabel: string
  viewFullDetails: string
}) {
  return (
    <div>

      <div className="mb-6 flex items-center gap-3">
        <span className="glass flex h-11 w-11 items-center justify-center rounded-xl text-brand">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-display text-xl font-semibold text-text">
          {label}
        </h3>
      </div>

      <ol className="relative">

        <span
          aria-hidden
          className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-brand/50 via-border to-transparent"
        />

        {items.map((item, i) => (
          <li key={i} className="relative pl-11 pb-5 last:pb-0">

            <span className="glass absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full text-brand">
              <Icon className="h-4 w-4" />
              {item.current && (
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand ring-2 ring-bg" />
                </span>
              )}
            </span>

            {item.detail ? (
              <button
                type="button"
                onClick={() => onOpen(item)}
                className="glass group block w-full cursor-pointer rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 focus:outline-none focus-visible:border-brand/60"
              >
                <CardBody item={item} completedLabel={completedLabel} nowLabel={nowLabel} />
                <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-brand-soft transition-colors group-hover:text-brand">
                  {viewFullDetails}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            ) : (
              <div className="glass rounded-2xl p-5 transition-all duration-300 hover:border-brand/30">
                <CardBody item={item} completedLabel={completedLabel} nowLabel={nowLabel} />
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
  const { t, tList } = useTranslate()

  const WORK: Item[] = [
    {
      period: 'Aug 2024 — Present',
      current: true,
      role: t('experience.work.vidux.role'),
      org: 'Vidux Informatikai Kft.',
      desc: t('experience.work.vidux.desc'),
      tags: ['React', 'TypeScript', 'Figma', 'UI Library', 'REST APIs'],
      detail: {
        subtitle: t('experience.work.vidux.detailSubtitle'),
        bullets: tList('experience.work.vidux.detailBullets'),
        stack: [
          { group: t('experience.work.vidux.stackGroups.languagesCore'), items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'] },
          { group: t('experience.work.vidux.stackGroups.frameworksLibraries'), items: ['React', 'Material UI', 'Jest'] },
          {
            group: t('experience.work.vidux.stackGroups.infraTools'),
            items: ['Git', 'Jenkins', 'SonarQube', 'Keycloak', 'RabbitMQ', 'Active Directory'],
          },
          {
            group: t('experience.work.vidux.stackGroups.aiAssisted'),
            items: ['Claude Code', 'GitHub Copilot', 'ChatGPT', 'Gemini'],
          },
          { group: t('experience.work.vidux.stackGroups.methodology'), items: ['Agile (Scrum / Kanban)'] },
        ],
      },
    },
    {
      period: t('experience.earlierLabel'),
      role: t('experience.work.accountant.role'),
      org: 'Caballo Verde Kft.',
      desc: t('experience.work.accountant.desc'),
    },
    {
      period: t('experience.earlierLabel'),
      role: t('experience.work.bartender.role'),
      org: 'Sziget Festival',
      desc: t('experience.work.bartender.desc'),
    },
  ]

  const EDUCATION: Item[] = [
    {
      done: true,
      period: '2026',
      role: t('experience.education.university.role'),
      org: 'University of Szeged',
      desc: t('experience.education.university.desc'),
      tags: ['Software Engineering', 'Algorithms', 'Databases'],
    },
    {
      done: true,
      role: t('experience.education.highschool.role'),
      org: 'Deák Ferenc Gimnázium, Kispest',
      desc: t('experience.education.highschool.desc'),
    },
  ]

  const completedLabel = t('experience.completedLabel')
  const nowLabel = t('experience.nowLabel')
  const viewFullDetails = t('experience.viewFullDetails')

  return (
    <section id="experience" className="relative px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow={t('experience.eyebrow')}
          title={
            <>
              {t('experience.titleLine1')} <span className="text-gradient">{t('experience.titleLine2')}</span>
            </>
          }
          intro={t('experience.intro')}
        />

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
          <TimelineColumn
            label={t('experience.workLabel')}
            icon={BriefcaseIcon}
            items={WORK}
            onOpen={setDetail}
            completedLabel={completedLabel}
            nowLabel={nowLabel}
            viewFullDetails={viewFullDetails}
          />
          <TimelineColumn
            label={t('experience.educationLabel')}
            icon={CapIcon}
            items={EDUCATION}
            onOpen={setDetail}
            completedLabel={completedLabel}
            nowLabel={nowLabel}
            viewFullDetails={viewFullDetails}
          />
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
                <PeriodBadge item={detail} completedLabel={completedLabel} nowLabel={nowLabel} />
                <h3
                  id="exp-detail-title"
                  className="mt-1.5 font-display text-2xl font-semibold text-text"
                >
                  {detail.role}
                </h3>
                <p className="text-sm font-medium text-text-muted">{detail.org}</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-text-muted">
              {detail.detail.subtitle}
            </p>

            <h4 className="eyebrow mt-7">{t('experience.modalWhatIDid')}</h4>
            <ul className="mt-3 space-y-2.5">
              {detail.detail.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-text-muted">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <h4 className="eyebrow mt-7">{t('experience.modalTechStackUsed')}</h4>
            <div className="mt-3 space-y-3">
              {detail.detail.stack.map(({ group, items }) => (
                <div key={group}>
                  <p className="font-mono text-[0.7rem] uppercase tracking-wider text-text-faint">
                    {group}
                  </p>
                  <ul className="mt-1.5 flex flex-wrap gap-2">
                    {items.map((tItem) => (
                      <li
                        key={tItem}
                        className="rounded-lg border border-border bg-surface-2 px-2.5 py-1 font-mono text-[0.7rem] text-text-muted"
                      >
                        {tItem}
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
