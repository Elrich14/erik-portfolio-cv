interface Props {
  index: string
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
}

export default function SectionHeading({ index, eyebrow, title, intro }: Props) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand/60" />
        <span className="eyebrow">
          <span className="text-brand">{index}</span> · {eyebrow}
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-brand/60" />
      </div>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-slate-400 sm:text-lg">{intro}</p>}
    </div>
  )
}
