import { ConductorHead } from './Conductor'
import { CodeThought } from './ThoughtIcons'

const INK = '#1b1a17'

// KERIAN's "work in progress" corner. The conductor gets off at the Projects
// stop and types here; while he is away the code stops and only the cursor blinks.
const LINES: { y: number; delay: number; parts: { x: number; w: number; fill: string }[] }[] = [
  { y: 71, delay: 0, parts: [{ x: 34, w: 22, fill: '#f2c230' }, { x: 60, w: 30, fill: '#9cc3e6' }] },
  { y: 80, delay: 0.8, parts: [{ x: 40, w: 18, fill: '#e8896b' }, { x: 62, w: 36, fill: '#ede6d6' }] },
  { y: 89, delay: 1.6, parts: [{ x: 40, w: 44, fill: '#9cc3e6' }] },
  { y: 98, delay: 2.4, parts: [{ x: 46, w: 26, fill: '#f2c230' }, { x: 76, w: 20, fill: '#e8896b' }] },
  { y: 107, delay: 3.2, parts: [{ x: 34, w: 14, fill: '#ede6d6' }] },
]

export default function LaptopScene({ occupied }: { occupied: boolean }) {
  return (
    <div className={`laptop-scene ${occupied ? 'is-visible' : ''}`} aria-hidden="true">
      <span className="thought-dot thought-dot-1" style={{ left: 98, top: 72, width: 8, height: 8 }} />
      <span className="thought-dot thought-dot-2" style={{ left: 107, top: 55, width: 12, height: 12 }} />
      <div className="thought-bubble" style={{ left: 119, top: 6, width: 58, height: 44 }}>
        <CodeThought />
      </div>
      <svg className="laptop-svg" width="180" height="150" viewBox="0 0 180 150">
        <g className="laptop-head">
          <g transform="translate(23 6.2) scale(0.7)">
            <ConductorHead />
          </g>
        </g>
        <rect x="20" y="58" width="118" height="76" rx="7" fill="#e4ded1" stroke={INK} strokeWidth="2.5" />
        <rect x="27" y="65" width="104" height="62" rx="3" fill="#1f2430" />
        {LINES.map((line) => (
          <g key={line.y} className="laptop-line" style={{ animationDelay: `${line.delay}s` }}>
            {line.parts.map((part) => (
              <rect key={part.x} x={part.x} y={line.y} width={part.w} height="4" rx="2" fill={part.fill} />
            ))}
          </g>
        ))}
        <rect className="laptop-cursor" x="52" y="106" width="5" height="7" fill="#f2c230" />
        <path
          d="M10 134 L148 134 L142 143 L16 143 Z"
          fill="#d6cebf"
          stroke={INK}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          className="laptop-steam"
          d="M155 118 q3 -4 0 -8 q-3 -4 0 -8"
          fill="none"
          stroke="var(--color-faint)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          className="laptop-steam"
          style={{ animationDelay: '1.2s' }}
          d="M161 118 q3 -4 0 -8 q-3 -4 0 -8"
          fill="none"
          stroke="var(--color-faint)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <rect x="151" y="124" width="14" height="17" rx="3" fill="#fffdf8" stroke={INK} strokeWidth="2" />
        <path d="M165 128 q6 0 6 5 q0 5 -6 5" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
      </svg>
    </div>
  )
}
