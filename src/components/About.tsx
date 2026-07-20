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
    body: 'I do my best work in lean, agile teams where I can own features end-to-end, communicate directly with designers and backend, and ship fast without bureaucracy.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
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

        {/* portrait placeholder */}
        <div className="mt-12 w-full max-w-[16rem]">
          <div className="glass relative aspect-[4/5] overflow-hidden rounded-3xl p-2">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/15 via-slate-800/40 to-blue-500/10">
              {/* grid texture */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
              <span className="relative font-display text-6xl font-bold text-white/80">
                BE
              </span>
              {/* corner tag */}
              <div className="glass absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl px-3 py-2">
                <span className="font-mono text-[0.7rem] text-slate-300">
                  Birkl Erik András
                </span>
                <span className="font-mono text-[0.6rem] text-brand">
                  // portrait
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* mindset */}
        <div className="mt-10 max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-slate-300">
            I approach every interface as a{' '}
            <span className="text-slate-100">product</span>, not just a screen.
            My goal is to build UI/UX that is genuinely functional — fast,
            accessible and intuitive — while still being{' '}
            <span className="text-slate-100">beautiful</span> enough that people
            actually enjoy using it.
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            I care about the details others skip: the easing of a transition,
            the contrast of a label, the rhythm of the spacing. That obsession is
            exactly what a great engineering-meets-design product needs.
          </p>
        </div>

        {/* soft skills */}
        <div className="mt-10 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
          {SOFT_SKILLS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="glass group flex flex-col items-center rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/30"
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
    </section>
  )
}
