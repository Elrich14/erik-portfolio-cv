interface Props {
  index: string
  title: string
  intro?: string
}

export default function SectionHeader({ index, title, intro }: Props) {
  return (
    <div className="mb-10 border-t-2 border-ink pt-4 sm:mb-14 print:mb-4 print:border-t print:pt-2">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-faint print:hidden">{index}</span>
        <h2 className="font-display text-4xl tracking-tight sm:text-5xl print:text-[17pt]">{title}</h2>
      </div>
      {intro && <p className="mt-4 max-w-2xl text-muted print:hidden">{intro}</p>}
    </div>
  )
}
