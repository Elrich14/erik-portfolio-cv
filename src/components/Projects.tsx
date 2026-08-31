import type { ComponentType, SVGProps } from 'react'
import SectionHeading from './SectionHeading'
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
  name: string
  tagline: string
  description: string
  highlights: Highlight[]
  stack: string[]
  repo: string
}

const PROJECTS: Project[] = [
  {
    badge: 'Thesis project · Solo build',
    name: 'KERIAN Webshop',
    tagline: 'Full-stack e-commerce, built solo — from concept to checkout.',
    description:
      'A clothing e-commerce platform I designed and built end-to-end as my thesis project — UI concept, database schema, REST backend and a real Stripe checkout. Customers browse and filter by size, colour and gender, manage a persistent cart and wishlist, and pay by card; admins get a 2FA-locked dashboard for products, orders and analytics.',
    highlights: [
      {
        icon: BotIcon,
        title: 'AI Product Recommendations',
        body: 'Claude Haiku 4.5 suggests cart-matching items by style and colour — never something already in the basket.',
      },
      {
        icon: CreditCardIcon,
        title: 'Stripe Checkout',
        body: 'End-to-end online card payments, from cart to order confirmation.',
      },
      {
        icon: ShieldIcon,
        title: '2FA Admin & Analytics',
        body: 'TOTP-secured admin panel with a live revenue, order and trend dashboard.',
      },
      {
        icon: ServerIcon,
        title: 'Concurrency-Safe Inventory',
        body: 'Pessimistic row locking keeps stock from going negative under simultaneous orders.',
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
  },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-brand-soft">
        {project.badge}
      </span>

      <h3 className="mt-4 font-display text-2xl font-semibold text-slate-100 sm:text-3xl">
        {project.name}
      </h3>
      <p className="mt-1.5 text-base font-medium text-slate-300">
        {project.tagline}
      </p>

      <p className="mt-5 max-w-3xl leading-relaxed text-slate-400">
        {project.description}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {project.highlights.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand transition-colors group-hover:bg-brand/20">
              <Icon className="h-5.5 w-5.5" />
            </div>
            <h4 className="mt-4 font-display text-base font-semibold text-slate-100">
              {title}
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
              {body}
            </p>
          </div>
        ))}
      </div>

      <ul className="mt-8 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-brand/40 hover:text-brand-soft"
          >
            {item}
          </li>
        ))}
      </ul>

      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 font-medium text-slate-200 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/10 hover:text-white"
      >
        <GithubIcon className="h-4.5 w-4.5" />
        View source on GitHub
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title={
            <>
              Building beyond{' '}
              <span className="text-gradient">the day job.</span>
            </>
          }
          intro="A full-stack project I designed, built and shipped solo, end to end."
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
