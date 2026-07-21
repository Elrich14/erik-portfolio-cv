import type { ComponentType, SVGProps } from 'react'
import SectionHeading from './SectionHeading'
import {
  CodeIcon,
  LayersIcon,
  WrenchIcon,
  ServerIcon,
  CheckIcon,
  BotIcon,
  GlobeIcon,
} from './icons'

interface Category {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  span: string
  items: string[]
}

const CATEGORIES: Category[] = [
  {
    icon: CodeIcon,
    title: 'Languages & Core',
    span: 'lg:col-span-2',
    items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    icon: LayersIcon,
    title: 'Frameworks & UI',
    span: 'lg:col-span-4',
    items: [
      'React 19',
      'React Router',
      'Redux Toolkit',
      'MUI 9',
      'Emotion',
      'Formik',
      'Yup',
      'Axios',
      'STOMP.js',
      'Vidux UI',
    ],
  },
  {
    icon: WrenchIcon,
    title: 'Build & Bundling',
    span: 'lg:col-span-2',
    items: ['Webpack 5', 'Babel 8', 'React Compiler', 'PostCSS'],
  },
  {
    icon: CheckIcon,
    title: 'Testing & Quality',
    span: 'lg:col-span-4',
    items: [
      'Jest',
      'React Testing Library',
      'MSW',
      'ESLint 9',
      'Prettier 3',
      'SonarQube',
    ],
  },
  {
    icon: ServerIcon,
    title: 'Infrastructure & DevOps',
    span: 'lg:col-span-6',
    items: [
      'Git',
      'Jenkins',
      'GitHub Actions',
      'Dependabot',
      'Docker / Podman',
      'Harbor',
      'nginx',
      'Keycloak',
      'RabbitMQ',
      'Active Directory',
      'i18next',
      'Agile (Scrum / Kanban)',
    ],
  },
  {
    icon: BotIcon,
    title: 'AI-Assisted Development',
    span: 'lg:col-span-3',
    items: ['Claude Code', 'GitHub Copilot', 'ChatGPT', 'Gemini'],
  },
  {
    icon: GlobeIcon,
    title: 'Spoken Languages',
    span: 'lg:col-span-3',
    items: ['Hungarian — Native', 'English — B2'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative px-4 py-16 sm:px-6 md:py-20">
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
              className={`glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 ${span}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand transition-colors group-hover:border-brand/30 group-hover:bg-brand/10">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="font-display text-base font-semibold text-slate-100">
                  {title}
                </h3>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
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
