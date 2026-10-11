import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ConductorContext } from './context'
import type { ConductorSpot, StopScene } from './context'

export function ConductorProvider({ children }: { children: ReactNode }) {
  const [popupOpen, setPopupOpen] = useState(false)
  const [contactBusy, setContactBusy] = useState(false)
  const [stopScene, setStopScene] = useState<StopScene | null>(null)
  const [tramTipKey, setTramTipKey] = useState(0)

  const location: ConductorSpot = popupOpen
    ? 'popup'
    : contactBusy || stopScene === 'contact'
      ? 'contact'
      : stopScene === 'laptop'
        ? 'laptop'
        : 'tram'

  const tipOnTram = useCallback(() => setTramTipKey((k) => k + 1), [])

  const value = useMemo(
    () => ({
      location,
      tramTipKey,
      tipOnTram,
      setStopScene,
      setPopupOpen,
      setContactBusy,
    }),
    [location, tramTipKey, tipOnTram],
  )

  return <ConductorContext.Provider value={value}>{children}</ConductorContext.Provider>
}
