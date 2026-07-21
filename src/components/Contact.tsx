import { useState, type FormEvent } from 'react'
import SectionHeading from './SectionHeading'
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  LinkedinIcon,
  GithubIcon,
  SendIcon,
  CheckIcon,
  ArrowUpRight,
} from './icons'

const DETAILS = [
  {
    icon: MailIcon,
    label: 'Email',
    value: 'elrich.020114@gmail.com',
    href: 'mailto:elrich.020114@gmail.com',
  },
  {
    icon: PhoneIcon,
    label: 'Phone',
    value: '+36 70 313 6282',
    href: 'tel:+36703136282',
  },
  {
    icon: MapPinIcon,
    label: 'Location',
    value: 'Budapest / Szeged',
    href: 'https://maps.google.com/?q=Budapest,+Hungary',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'in/erik-birkl-a1565a29a',
    href: 'https://www.linkedin.com/in/erik-birkl-a1565a29a',
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/Elrich14',
    href: 'https://github.com/Elrich14',
  },
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

const ENDPOINT =
  (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim() ||
  'https://formspree.io/f/mjgnrlev'
const USES_ENDPOINT = Boolean(ENDPOINT)
const MY_EMAIL = 'elrich.020114@gmail.com'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const reset = () => {
    setForm({ name: '', email: '', message: '' })
    window.setTimeout(() => setStatus('idle'), 5000)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return

    if (!ENDPOINT) {
      const subject = encodeURIComponent(
        `Portfolio message from ${form.name || 'a visitor'}`,
      )
      const body = encodeURIComponent(
        `${form.message}\n\n— ${form.name} <${form.email}>`,
      )
      window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`
      setStatus('sent')
      reset()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      reset()
    } catch {
      setStatus('error')
      window.setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const disabled = status === 'sending'
  const sentLabel = USES_ENDPOINT
    ? 'Message sent successfully'
    : 'Opening your email app'

  return (
    <section id="contact" className="relative px-4 py-16 sm:px-6 md:py-20">

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build{' '}
              <span className="text-gradient">something.</span>
            </>
          }
          intro="Have a role, a project or just a question? My inbox is always open — I’ll get back to you quickly."
        />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-5">

          <div className="lg:col-span-2">
            <ul className="flex h-full flex-col gap-3">
              {DETAILS.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex-1">
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="glass group flex h-full items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand transition-colors group-hover:border-brand/30 group-hover:bg-brand/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[0.7rem] uppercase tracking-wider text-slate-500">
                        {label}
                      </p>
                      <p className="truncate text-sm font-medium text-slate-200">
                        {value}
                      </p>
                    </div>
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-brand" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={onSubmit} className="glass flex h-full flex-col rounded-3xl p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  disabled={disabled}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  disabled={disabled}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                />
              </div>

              <div className="mt-5 flex flex-1 flex-col">
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-xs uppercase tracking-wider text-slate-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Tell me about the role or project…"
                  value={form.message}
                  disabled={disabled}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-100 placeholder:text-slate-600 transition-colors focus:border-brand/50 focus:bg-white/[0.05] focus:outline-none disabled:opacity-60"
                />
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={disabled}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-medium transition-all disabled:cursor-not-allowed ${
                    status === 'sent'
                      ? 'bg-brand/15 text-brand-soft'
                      : 'bg-brand text-emerald-950 shadow-lg shadow-brand/25 hover:-translate-y-0.5 hover:bg-brand-soft disabled:translate-y-0'
                  }`}
                >
                  {(status === 'idle' || status === 'error') && (
                    <>
                      Send message
                      <SendIcon className="h-4.5 w-4.5" />
                    </>
                  )}
                  {status === 'sending' && (
                    <>
                      <span className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-emerald-950/30 border-t-emerald-950" />
                      Sending…
                    </>
                  )}
                  {status === 'sent' && (
                    <>
                      <CheckIcon className="h-4.5 w-4.5" />
                      {sentLabel}
                    </>
                  )}
                </button>

                <p aria-live="polite" className="font-mono text-xs">
                  {status === 'error' ? (
                    <span className="text-rose-400">
                      Couldn&apos;t send —{' '}
                      <a
                        href={`mailto:${MY_EMAIL}`}
                        className="underline transition-colors hover:text-rose-300"
                      >
                        email me directly
                      </a>
                      .
                    </span>
                  ) : status === 'sent' ? (
                    <span className="text-brand-soft">
                      {USES_ENDPOINT
                        ? '✓ Thanks — I’ll be in touch.'
                        : '✓ Your email app should open — just hit send.'}
                    </span>
                  ) : (
                    <span className="text-slate-500">
                      {USES_ENDPOINT
                        ? 'I usually reply within a day.'
                        : 'Opens in your email app.'}
                    </span>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FieldProps {
  id: string
  label: string
  type: string
  placeholder: string
  value: string
  disabled: boolean
  onChange: (v: string) => void
}

function Field({ id, label, type, placeholder, value, disabled, onChange }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-xs uppercase tracking-wider text-slate-400"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-100 placeholder:text-slate-600 transition-colors focus:border-brand/50 focus:bg-white/[0.05] focus:outline-none disabled:opacity-60"
      />
    </div>
  )
}
