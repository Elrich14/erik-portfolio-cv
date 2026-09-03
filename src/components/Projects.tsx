import type { ComponentType, SVGProps } from 'react'
import SectionHeading from './SectionHeading'
import { useTranslate } from '../i18n/LanguageContext'
import {
  BotIcon,
  CreditCardIcon,
  ShieldIcon,
  ServerIcon,
  GithubIcon,
  ArrowUpRight,
} from './icons'

interface Highlight {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  body: string
}

interface Project {
  badge: string
  inProgress?: boolean
  inProgressLabel: string
  name: string
  tagline: string
  description: string
  highlights: Highlight[]
  stack: string[]
  repo: string
  cta: string
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-brand-soft">
          {project.badge}
        </span>
        {project.inProgress && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-brand-soft">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            {project.inProgressLabel}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-2xl font-semibold text-text sm:text-3xl">
        {project.name}
      </h3>
      <p className="mt-1.5 text-base font-medium text-text-muted">
        {project.tagline}
      </p>

      <p className="mt-5 max-w-3xl leading-relaxed text-text-muted">
        {project.description}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {project.highlights.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="group rounded-2xl border border-border bg-surface-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand transition-colors group-hover:bg-brand/20">
              <Icon className="h-5.5 w-5.5" />
            </div>
            <h4 className="mt-4 font-display text-base font-semibold text-text">
              {title}
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
              {body}
            </p>
          </div>
        ))}
      </div>

      <ul className="mt-8 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-brand/40 hover:text-brand-soft"
          >
            {item}
          </li>
        ))}
      </ul>

      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-5 py-3 font-medium text-text backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/10 hover:text-text"
      >
        <GithubIcon className="h-4.5 w-4.5" />
        {project.cta}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  )
}

export default function Projects() {
  const { t } = useTranslate()

  const PROJECTS: Project[] = [
    {
      badge: t('projects.kerian.badge'),
      inProgress: true,
      inProgressLabel: t('projects.kerian.inProgressLabel'),
      name: 'KERIAN Webshop',
      tagline: t('projects.kerian.tagline'),
      description: t('projects.kerian.description'),
      highlights: [
        {
          icon: BotIcon,
          title: t('projects.kerian.highlightAiTitle'),
          body: t('projects.kerian.highlightAiBody'),
        },
        {
          icon: CreditCardIcon,
          title: t('projects.kerian.highlightStripeTitle'),
          body: t('projects.kerian.highlightStripeBody'),
        },
        {
          icon: ShieldIcon,
          title: t('projects.kerian.highlightAdminTitle'),
          body: t('projects.kerian.highlightAdminBody'),
        },
        {
          icon: ServerIcon,
          title: t('projects.kerian.highlightInventoryTitle'),
          body: t('projects.kerian.highlightInventoryBody'),
        },
      ],
      stack: [
        'Next.js 15',
        'TypeScript',
        'Express.js',
        'PostgreSQL',
        'Sequelize',
        'Zustand',
        'TanStack Query',
        'Stripe',
        'Docker',
        'Claude AI',
      ],
      repo: 'https://github.com/Elrich14/BirklSzakdoga',
      cta: t('projects.kerian.cta'),
    },
  ]

  return (
    <section id="projects" className="relative px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow={t('projects.eyebrow')}
          title={
            <>
              {t('projects.titleLine1')}{' '}
              <span className="text-gradient">{t('projects.titleLine2')}</span>
            </>
          }
          intro={t('projects.intro')}
        />

        <div className="mt-12 space-y-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
