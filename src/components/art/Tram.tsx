import { ConductorFigure } from './Conductor'
import { TRAM } from './tramGeometry'

const INK = '#1b1a17'

interface Props {
  scale: number
  conductorOnBoard: boolean
  tipKey: number
}

export default function Tram({ scale, conductorOnBoard, tipKey }: Props) {
  return (
    <svg
      width={TRAM.width * scale}
      height={TRAM.height * scale}
      viewBox={`0 0 ${TRAM.width} ${TRAM.height}`}
      style={{ overflow: 'visible' }}
      className="block"
      aria-hidden="true"
    >
      <g className="tram-light" pointerEvents="none">
        <path d="M161 65.5 L249 94 A34 5.5 0 0 0 181 94 L160 75 Z" fill="#ffe49a" fillOpacity="0.26" />
        <ellipse cx="215" cy="94" rx="34" ry="5.5" fill="#ffe49a" fillOpacity="0.42" />
        <path d="M184 94 L246 94" stroke="#ffe49a" strokeWidth="2" strokeLinecap="round" />
      </g>
      <path
        d="M108 26 L100 14 L116 6"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect x="14" y="78" width="40" height="5" rx="2" fill="var(--tram-wheel)" />
      <line x1="20" y1="40" x2="20" y2="79" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="50" y="26" width="116" height="54" rx="12" fill="var(--color-tram)" stroke={INK} strokeWidth="2.5" />
      <g fill="var(--tram-window)" stroke={INK} strokeWidth="1.5">
        <rect x="60" y="34" width="16" height="18" rx="3" />
        <rect x="80" y="34" width="16" height="18" rx="3" />
        <rect x="120" y="34" width="16" height="18" rx="3" />
        <rect x="140" y="34" width="16" height="18" rx="3" />
        <rect x="102" y="33" width="12" height="40" rx="2" />
      </g>
      <line x1="52" y1="62" x2="99" y2="62" stroke={INK} strokeWidth="1.5" />
      <line x1="117" y1="62" x2="150" y2="62" stroke={INK} strokeWidth="1.5" />
      <g className="tram-light" pointerEvents="none">
        <circle cx="158" cy="70" r="15" fill="#ffe49a" fillOpacity="0.16" />
        <circle cx="158" cy="70" r="9.5" fill="#ffe49a" fillOpacity="0.38" />
      </g>
      <circle className="tram-lens" cx="158" cy="70" r="5" stroke={INK} strokeWidth="2" />
      <circle cx="72" cy="86" r="7" fill="var(--tram-wheel)" />
      <circle cx="144" cy="86" r="7" fill="var(--tram-wheel)" />
      <g transform="translate(2.6 17.96) scale(0.38)">
        <g className="tram-conductor" style={{ opacity: conductorOnBoard ? 1 : 0 }}>
          <ConductorFigure tipKey={tipKey} lookAtPointer={conductorOnBoard} />
        </g>
      </g>
    </svg>
  )
}
