import type { ComponentType, SVGProps } from 'react'
import SectionHeading from './SectionHeading'
import { useTranslate } from '../i18n/LanguageContext'
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

export default function Skills() {
  const { t, tList } = useTranslate()

  const CATEGORIES: Category[] = [
    {
      icon: CodeIcon,
      title: t('skills.categories.languagesCore'),
      span: 'lg:col-span-2',
      items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
    },
    {
      icon: LayersIcon,
      title: t('skills.categories.frameworksUi'),
      span: 'lg:col-span-4',
      items: [
        'React',
        'React Router',
        'Redux Toolkit',
        'MUI',
        'Emotion',
        'Formik',
        'Yup',
        'Axios',
        'STOMP.js',
      ],
    },
    {
      icon: WrenchIcon,
      title: t('skills.categories.buildBundling'),
      span: 'lg:col-span-2',
      items: ['Webpack', 'Babel', 'React Compiler', 'PostCSS'],
    },
    {
      icon: CheckIcon,
      title: t('skills.categories.testingQuality'),
      span: 'lg:col-span-4',
      items: ['Jest', 'React Testing Library', 'ESLint', 'Prettier', 'SonarQube'],
    },
    {
      icon: ServerIcon,
      title: t('skills.categories.infraDevops'),
      span: 'lg:col-span-6',
      items: [
        'Git',
        'Jenkins',
        'GitHub Actions',
        'Dependabot',
        'Docker / Podman',
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
      title: t('skills.categories.aiAssisted'),
      span: 'lg:col-span-3',
      items: ['Claude Code', 'GitHub Copilot', 'ChatGPT', 'Gemini'],
    },
    {
      icon: GlobeIcon,
      title: t('skills.categories.spokenLanguages'),
      span: 'lg:col-span-3',
      items: tList('skills.spokenLanguagesItems'),
    },
  ]

  return (
    <section id="skills" className="relative px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow={t('skills.eyebrow')}
          title={
            <>
              {t('skills.titleLine1')}{' '}
              <span className="text-gradient">{t('skills.titleLine2')}</span>
            </>
          }
          intro={t('skills.intro')}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {CATEGORIES.map(({ icon: Icon, title, span, items }) => (
            <div
              key={title}
              className={`glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 ${span}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-brand transition-colors group-hover:border-brand/30 group-hover:bg-brand/10">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="font-display text-base font-semibold text-text">
                  {title}
                </h3>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-brand/40 hover:text-brand-soft"
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
