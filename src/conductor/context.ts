import { createContext, useContext } from 'react'

// The conductor is in exactly one place at a time; this is where.
export type ConductorSpot = 'tram' | 'popup' | 'laptop' | 'contact'

// Stops where he gets off the tram: Projects (works on the laptop) and
// Contact (waits at the form with a ticket to punch).
export type StopScene = 'laptop' | 'contact'

export interface ConductorApi {
  location: ConductorSpot
  // Bumped to make the conductor on the tram tip his cap.
  tramTipKey: number
  tipOnTram: () => void
  setStopScene: (scene: StopScene | null) => void
  setPopupOpen: (value: boolean) => void
  // Keeps him at the form until a ticket punch has finished.
  setContactBusy: (value: boolean) => void
}

export const ConductorContext = createContext<ConductorApi | null>(null)

export function useConductor(): ConductorApi {
  const ctx = useContext(ConductorContext)
  if (!ctx) {
    throw new Error('useConductor must be used within a ConductorProvider')
  }
  return ctx
}
