// Names of tools and technologies are the same in both languages, so they live
// here instead of the translation files.

export type SkillGroupKey =
  | 'languages'
  | 'frameworks'
  | 'build'
  | 'testing'
  | 'infra'
  | 'methodology'
  | 'ai'
  | 'spoken'

// `null` items come from the dictionary (they are translated).
export const SKILL_GROUPS: { key: SkillGroupKey; items: string[] | null }[] = [
  { key: 'languages', items: ['JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  {
    key: 'frameworks',
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
      'i18next',
    ],
  },
  { key: 'build', items: ['Webpack', 'Babel', 'React Compiler', 'PostCSS'] },
  {
    key: 'testing',
    items: ['Jest', 'React Testing Library', 'ESLint', 'Prettier', 'SonarQube'],
  },
  {
    key: 'infra',
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
    ],
  },
  { key: 'methodology', items: null },
  { key: 'ai', items: ['Claude Code', 'GitHub Copilot', 'ChatGPT', 'Gemini'] },
  { key: 'spoken', items: null },
]

export type JobId = 'vidux' | 'caballo' | 'sziget'
export const JOB_IDS: JobId[] = ['vidux', 'caballo', 'sziget']

export type EducationId = 'university' | 'highschool'
export const EDUCATION_IDS: EducationId[] = ['university', 'highschool']

export type StackGroupKey = 'languages' | 'frameworks' | 'infra' | 'ai' | 'methodology'

// Only the Vidux popup lists a tech stack.
export const VIDUX_STACK: { key: StackGroupKey; items: string[] | null }[] = [
  { key: 'languages', items: ['JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { key: 'frameworks', items: ['React', 'Material UI', 'Jest'] },
  {
    key: 'infra',
    items: ['Git', 'Jenkins', 'SonarQube', 'Keycloak', 'RabbitMQ', 'Active Directory'],
  },
  { key: 'ai', items: ['Claude Code', 'GitHub Copilot', 'ChatGPT', 'Gemini'] },
  { key: 'methodology', items: null },
]

export const KERIAN = {
  repo: 'https://github.com/Elrich14/BirklSzakdoga',
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
    'Claude API',
  ],
}
