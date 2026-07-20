import type { ComponentType, SVGProps } from 'react'
import SectionHeading from './SectionHeading'
import { CodeIcon, LayersIcon, WrenchIcon, BotIcon, GlobeIcon } from './icons'

interface Category {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  span: string
  items: string[]
}

const CATEGORIES: Category[] = [
  {
    icon: CodeIcon,
    title: 'Languages & Fundamentals',
    span: 'lg:col-span-2',
    items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    icon: LayersIcon,
    title: 'Frameworks & Libraries',
    span: 'lg:col-span-2',
    items: ['React', 'Material UI', 'Jest'],
  },
  {
    icon: BotIcon,
    title: 'AI-Assisted Development',
    span: 'lg:col-span-2',
    items: ['Claude Code', 'GitHub Copilot', 'ChatGPT', 'Gemini'],
  },
  {
    icon: WrenchIcon,
    title: 'Infrastructure & Tooling',
    span: 'lg:col-span-4',
    items: [
      'Git',
      'Jenkins',
      'SonarQube',
      'Keycloak',
      'RabbitMQ',
      'Active Directory',
      'Agile (Scrum / Kanban)',
    ],
  },
  {
    icon: GlobeIcon,
    title: 'Spoken Languages',
    span: 'lg:col-span-2',
    items: ['Hungarian — Native', 'English — B2'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative px-4 py-24 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title={
            <>
              The toolkit I{' '}
              <span className="text-gradient">build with.</span>
            </>
          }
          intro="From the fundamentals to the frameworks, the pipeline and the AI copilots that speed it all up."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {CATEGORIES.map(({ icon: Icon, title, span, items }) => (
            <div
              key={title}
              className={`glass group rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 ${span}`}
            >
              <div className="flex items-center justify-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand transition-colors group-hover:border-brand/30 group-hover:bg-brand/10">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="font-display text-base font-semibold text-slate-100">
                  {title}
                </h3>
              </div>

              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-brand/40 hover:text-brand-soft"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
