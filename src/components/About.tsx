import SectionHeading from './SectionHeading'
import { PaletteIcon, UsersIcon } from './icons'

const SOFT_SKILLS = [
  {
    icon: PaletteIcon,
    title: 'UI/UX Design Mindset',
    body: 'I think in components and user flows. Design isn’t a final coat of paint — it’s baked into how I structure, name and build things from the first commit.',
  },
  {
    icon: UsersIcon,
    title: 'Small-Team Specialist',
    body: 'I feel most at home in small, agile teams where I can own features end-to-end, communicate directly with designers and backend, and ship fast without bureaucracy.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              A designer&apos;s eye,{' '}
              <span className="text-gradient">an engineer&apos;s mind.</span>
            </>
          }
        />

        <div className="mt-12 grid items-stretch gap-8 md:grid-cols-5 md:gap-12">

          <div className="md:col-span-2">
            <div className="glass relative mx-auto aspect-[4/5] max-w-[18rem] overflow-hidden rounded-3xl p-2 md:aspect-auto md:h-full md:max-w-none">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <img
                  src="/portrait.jpg"
                  alt="Birkl Erik András"
                  className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"
                />
                <div className="glass absolute inset-x-3 bottom-3 flex items-center justify-center rounded-xl px-3 py-2">
                  <span className="font-mono text-xs text-slate-300">
                    Birkl Erik András
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-lg leading-relaxed text-slate-300">
              I approach every interface as a{' '}
              <span className="text-slate-100">product</span>, not just a screen.
              My goal is to build UI/UX that is genuinely functional — fast,
              accessible and intuitive — while still being{' '}
              <span className="text-slate-100">beautiful</span> enough that
              people actually enjoy using it.
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              I care about the details others skip: the easing of a transition,
              the contrast of a label, the rhythm of the spacing. That obsession
              is exactly what a great engineering-meets-design product needs.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {SOFT_SKILLS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="glass group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand transition-colors group-hover:bg-brand/20">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-slate-100">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
