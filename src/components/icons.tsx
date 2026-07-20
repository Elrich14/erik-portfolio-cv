import type { SVGProps } from 'react'

/* A minimal, dependency-free icon set (Lucide-style, 24×24 stroke). */

type IconProps = SVGProps<SVGSVGElement>

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Base>
)

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
)

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
)

export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17L17 7M8 7h9v9" />
  </Base>
)

export const ArrowUp = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Base>
)

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Base>
)

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 3 5a1 1 0 0 1 1-1Z" />
  </Base>
)

export const MapPinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Base>
)

export const LinkedinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9v11M4 4.5v.01M9 20v-6a3 3 0 0 1 6 0v6M9 9v11" />
  </Base>
)

export const GithubIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6.2 3.3 5.1 3.6 5.1 3.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.7 10c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22" />
  </Base>
)

export const SendIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
  </Base>
)

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Base>
)

export const SparklesIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
  </Base>
)

export const CodeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />
  </Base>
)

export const LayersIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5M3 16.5l9 5 9-5" />
  </Base>
)

export const WrenchIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.5 6a3.5 3.5 0 0 0 4.5 4.5l-9 9A2.1 2.1 0 0 1 6.5 16.5l9-9A3.5 3.5 0 0 0 14.5 6Z" />
  </Base>
)

export const BotIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="8" width="16" height="11" rx="2.5" />
    <path d="M12 8V4M8 3.5h8M9 13v1.5M15 13v1.5" />
  </Base>
)

export const GlobeIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-6-3.5-9S9.5 5.5 12 3Z" />
  </Base>
)

export const BriefcaseIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
  </Base>
)

export const CapIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M22 9 12 4 2 9l10 5 10-5Z" />
    <path d="M6 11v5c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-5" />
  </Base>
)

export const PaletteIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3a9 9 0 0 0 0 18c1.1 0 1.7-.9 1.5-1.8-.3-1.1.5-2.2 1.7-2.2H17a4 4 0 0 0 4-4c0-5-4-8-9-8Z" />
    <circle cx="7.5" cy="11" r="1" />
    <circle cx="12" cy="8" r="1" />
    <circle cx="16" cy="11" r="1" />
  </Base>
)

export const UsersIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="8" r="3.2" />
    <path d="M22 20v-2a4 4 0 0 0-3-3.8M16 4.2A3.2 3.2 0 0 1 16 10.6" />
  </Base>
)
