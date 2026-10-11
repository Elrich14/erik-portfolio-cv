// Small ink-style pictures that appear in the conductor's thought bubble.
import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

function Base({ children, ...props }: Props & { children: React.ReactNode }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function VideoCameraThought(props: Props) {
  return (
    <Base {...props}>
      <rect x="3" y="9" width="17" height="13" rx="3" />
      <path d="M20 13.5 L27 9.5 V21.5 L20 17.5" />
      <circle cx="8" cy="13" r="1.4" fill="currentColor" stroke="none" />
    </Base>
  )
}

export function CalculatorThought(props: Props) {
  return (
    <Base {...props}>
      <rect x="6" y="3" width="18" height="24" rx="3" />
      <rect x="9.5" y="6.5" width="11" height="5" rx="1" fill="var(--color-tram)" />
      <path d="M10.5 16 h1 M15 16 h0.1 M19.5 16 h0.1 M10.5 20 h1 M15 20 h0.1 M19.5 20 h0.1 M10.5 23.5 h1 M15 23.5 h4.5" strokeWidth="2.4" />
    </Base>
  )
}

export function MugThought(props: Props) {
  return (
    <Base {...props}>
      <path d="M6 10 H19 V25 a2 2 0 0 1 -2 2 H8 a2 2 0 0 1 -2 -2 Z" fill="var(--color-tram)" />
      <path d="M19 13 h3 a3 3 0 0 1 3 3 v2 a3 3 0 0 1 -3 3 h-3" />
      <path d="M5 10 a3 3 0 0 1 3.5 -4 a3.5 3.5 0 0 1 6 -1 a3 3 0 0 1 5 3 a2 2 0 0 1 0 2 Z" fill="var(--color-paper)" />
    </Base>
  )
}

export function CodeThought(props: Props) {
  return (
    <Base {...props}>
      <path d="M10 9 L4 15 L10 21 M20 9 L26 15 L20 21 M17 6 L13 24" strokeWidth="2.2" />
    </Base>
  )
}

// A tram ticket. The punch hole pops in when a parent gets `is-punched`, and
// the VALIDATED stamp lands when it gets `is-done`.
export function TicketThought(props: Props) {
  return (
    <svg width="100" height="54" viewBox="0 0 88 48" aria-hidden="true" {...props}>
      <g className="ticket-body">
        <path
          d="M5 2 H83 a3 3 0 0 1 3 3 V19 a5 5 0 0 0 0 10 V43 a3 3 0 0 1 -3 3 H5 a3 3 0 0 1 -3 -3 V29 a5 5 0 0 0 0 -10 V5 a3 3 0 0 1 3 -3 Z"
          fill="var(--color-tram)"
          stroke="#1b1a17"
          strokeWidth="1.8"
        />
        <path d="M64 6 V42" stroke="#1b1a17" strokeWidth="1.2" strokeDasharray="2.5 2.5" />
        <path d="M11 11 H44 M11 17 H34" stroke="#1b1a17" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M11 39 H52" stroke="#1b1a17" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <circle className="ticket-hole" cx="75" cy="24" r="4.6" fill="var(--color-paper)" stroke="#1b1a17" strokeWidth="1.4" />
        <g className="ticket-stamp">
          <g transform="rotate(-10 33 27)">
            <rect x="6" y="20" width="54" height="14" rx="3" fill="none" stroke="#c4321c" strokeWidth="1.6" />
            <text
              x="33"
              y="30.2"
              textAnchor="middle"
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="8.5"
              fontWeight="500"
              letterSpacing="0.2"
              fill="#c4321c"
            >
              VALIDATED
            </text>
          </g>
        </g>
      </g>
    </svg>
  )
}
