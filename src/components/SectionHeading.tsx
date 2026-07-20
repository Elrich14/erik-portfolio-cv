interface Props {
  index: string
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
}

export default function SectionHeading({ index, eyebrow, title, intro }: Props) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-medium text-brand">{index}</span>
        <span className="h-px w-8 bg-gradient-to-r from-brand/60 to-transparent" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-slate-400 sm:text-lg">{intro}</p>}
    </div>
  )
}
