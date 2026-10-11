import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from './icons'
import { useTranslate } from '../i18n/context'

interface Props {
  open: boolean
  onClose: () => void
  labelledBy?: string
  children: ReactNode
  // Rendered next to the dialog panel (the conductor stands here).
  aside?: ReactNode
}

export default function Modal({ open, onClose, labelledBy, children, aside }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  const { d } = useTranslate()

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return

    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = requestAnimationFrame(() => closeRef.current?.focus())

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className="modal-fade modal-scrim fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="my-auto flex w-full max-w-3xl flex-col items-end gap-2 md:flex-row md:items-end md:gap-0">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          className="modal-pop relative w-full rounded-2xl border-2 border-ink bg-paper p-6 sm:p-8 md:max-w-xl"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={d.modal.close}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink transition-colors hover:bg-ink hover:text-bg"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          {children}
        </div>
        {aside && <div className="shrink-0 md:-ml-2">{aside}</div>}
      </div>
    </div>,
    document.body,
  )
}
