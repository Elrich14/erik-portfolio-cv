import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { useTranslate } from '../i18n/context'
import { useConductor } from '../conductor/context'
import { FORMSPREE_ENDPOINT, PROFILE } from '../data/profile'
import SectionHeader from './SectionHeader'
import CvButton from './CvButton'
import ConductorStage from './art/ConductorStage'
import { TicketThought } from './art/ThoughtIcons'
import { ArrowUpRight, CheckIcon, CopyIcon } from './icons'

type Status = 'idle' | 'sending' | 'sent' | 'error'
// While the tram is at the Contact stop the conductor waits on top of the form
// with a ticket. When a message is sent he punches it like an old BKV ticket,
// stamps it VALIDATED and tips his cap. The validated ticket stays until the
// visitor starts writing a new message.
type TicketStep = 'waiting' | 'punched' | 'done'

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  }
}

export default function Contact() {
  const { d } = useTranslate()
  const { location, tipOnTram, setContactBusy } = useConductor()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [copied, setCopied] = useState(false)
  const [ticket, setTicket] = useState<TicketStep>('waiting')
  const [stageTip, setStageTip] = useState(0)
  const timers = useRef<number[]>([])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const onCopy = async () => {
    if (await copyText(PROFILE.email)) {
      setCopied(true)
      // Whichever conductor is visible tips his cap.
      if (location === 'contact') setStageTip((k) => k + 1)
      else tipOnTram()
      later(2000, () => setCopied(false))
    }
  }

  const punchTicket = () => {
    // Keeps him at the form even if the visitor scrolls away mid-punch. If he
    // was still on the tram, give him time to walk over before punching.
    const walk = location === 'contact' ? 0 : 650
    setContactBusy(true)
    setTicket('waiting')
    later(walk + 500, () => setTicket('punched'))
    later(walk + 900, () => {
      setTicket('done')
      setStageTip((k) => k + 1)
    })
    later(walk + 3400, () => setContactBusy(false))
  }

  // Starting a new message gets a fresh, unpunched ticket.
  const update = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (ticket === 'done') setTicket('waiting')
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Portfolio: ${form.name}`, _gotcha: honeypot }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      punchTicket()
      later(6000, () => setStatus('idle'))
    } catch {
      setStatus('error')
    }
  }

  const rows: { label: string; content: ReactNode }[] = [
    {
      label: d.contact.labels.email,
      content: (
        <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={`mailto:${PROFILE.email}`} className="link-draw break-all">
            {PROFILE.email}
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-ink print:hidden"
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            <span aria-live="polite">{copied ? d.contact.copied : d.contact.copy}</span>
          </button>
        </span>
      ),
    },
    {
      label: d.contact.labels.phone,
      content: (
        <a href={PROFILE.phoneHref} className="link-draw">
          {PROFILE.phoneDisplay}
        </a>
      ),
    },
    { label: d.contact.labels.location, content: d.contact.locationValue },
    {
      label: d.contact.labels.linkedin,
      content: (
        <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex items-center gap-1">
          {PROFILE.linkedinDisplay}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ),
    },
    {
      label: d.contact.labels.github,
      content: (
        <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex items-center gap-1">
          {PROFILE.githubDisplay}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ),
    },
    { label: d.contact.labels.cv, content: <CvButton variant="link" /> },
  ]

  const field =
    'w-full rounded-lg border-2 border-hair bg-bg px-4 py-3 text-text placeholder:text-faint transition-colors focus:border-ink focus:outline-none disabled:opacity-60'
  const label = 'mb-2 block font-mono text-xs tracking-wide text-faint'
  const sending = status === 'sending'

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-24 print:hidden">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="05" title={d.contact.title} intro={d.contact.intro} />

        <div className="grid items-start gap-10 lg:pt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <dl className="divide-y divide-hair border-y border-hair">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
                <dt className="pt-0.5 font-mono text-xs tracking-wide text-faint">{row.label}</dt>
                <dd>{row.content}</dd>
              </div>
            ))}
          </dl>

          <form
            onSubmit={onSubmit}
            className={`relative mt-44 rounded-xl border-2 border-ink bg-paper p-6 sm:p-8 lg:mt-0 print:hidden ${
              ticket === 'punched' || ticket === 'done' ? 'is-punched' : ''
            } ${ticket === 'done' ? 'is-done' : ''}`}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={label}>
                  {d.contact.form.name}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={d.contact.form.namePlaceholder}
                  value={form.name}
                  disabled={sending}
                  onChange={(e) => update('name', e.target.value)}
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="email" className={label}>
                  {d.contact.form.email}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={d.contact.form.emailPlaceholder}
                  value={form.email}
                  disabled={sending}
                  onChange={(e) => update('email', e.target.value)}
                  className={field}
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className={label}>
                {d.contact.form.message}
              </label>
              <textarea
                id="message"
                required
                rows={6}
                placeholder={d.contact.form.messagePlaceholder}
                value={form.message}
                disabled={sending}
                onChange={(e) => update('message', e.target.value)}
                className={`${field} block resize-y`}
              />
            </div>

            {/* Spam trap for bots; Formspree drops submissions that fill it in. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="_gotcha">{d.contact.form.honeypot}</label>
              <input
                id="_gotcha"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-ink px-6 py-3 font-medium text-bg transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
              >
                {status === 'sending' ? d.contact.form.sending : status === 'sent' ? d.contact.form.sent : d.contact.form.send}
              </button>
              <p aria-live="polite" className="text-sm sm:max-w-[16rem]">
                {status === 'sent' && <span className="text-muted">{d.contact.form.statusSent}</span>}
                {status === 'error' && (
                  <span className="text-danger">
                    {d.contact.form.statusError}{' '}
                    <a href={`mailto:${PROFILE.email}`} className="underline">
                      {PROFILE.email}
                    </a>
                  </span>
                )}
              </p>
            </div>

            {/* He stands on the top edge of the form, so he never covers a field. */}
            <ConductorStage
              className="absolute right-4 bottom-full sm:right-8"
              visible={location === 'contact'}
              tipKey={stageTip}
              bubbleWidth={124}
              bubbleHeight={70}
              thought={<TicketThought />}
            />
          </form>
        </div>
      </div>
    </section>
  )
}
