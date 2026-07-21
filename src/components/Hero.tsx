import { ArrowRight, ArrowUpRight, MapPinIcon, GlobeIcon, SparklesIcon } from './icons'

const FACTS = [
  { icon: MapPinIcon, label: 'Budapest, HU' },
  { icon: GlobeIcon, label: 'EN · B2' },
  { icon: SparklesIcon, label: 'Frontend @ Vidux' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-4 pt-32 pb-20 sm:px-6"
    >

      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-0 h-[32rem] w-[32rem] rounded-full bg-brand/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 h-[32rem] w-[30rem] rounded-full bg-accent/12 blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-3xl text-center">

        <div className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          <span className="font-mono text-xs tracking-wide text-slate-300">
            Open to Remote &amp; Hybrid opportunities
          </span>
        </div>

        <h1 className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-tight text-slate-100 sm:text-6xl md:text-7xl">
          Hi, I&apos;m
          <br className="hidden sm:block" />{' '}
          <span className="text-gradient">Birkl Erik András.</span>
        </h1>

        <p className="mt-6 font-display text-xl font-medium sm:text-2xl md:text-3xl">
          <span className="text-slate-100">Frontend Developer</span>{' '}
          <span className="text-slate-500">·</span>{' '}
          <span className="text-slate-400">React &amp; TypeScript</span>
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          I&apos;m driven by where code meets design — turning ideas into
          interfaces that are as functional as they are beautiful.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <a
            href="#experience"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-medium text-emerald-950 shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-soft hover:shadow-brand/40"
          >
            Experience
            <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-medium text-slate-200 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/10 hover:text-white"
          >
            Get in touch
            <ArrowUpRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {FACTS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-slate-400">
              <Icon className="h-4 w-4 text-brand" />
              <span className="font-mono text-xs tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
