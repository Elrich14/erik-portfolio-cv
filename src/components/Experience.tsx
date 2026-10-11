import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useTranslate } from '../i18n/context'
import { useConductor } from '../conductor/context'
import { EDUCATION_IDS, JOB_IDS, VIDUX_STACK } from '../data/content'
import type { JobId } from '../data/content'
import SectionHeader from './SectionHeader'
import Modal from './Modal'
import ConductorStage from './art/ConductorStage'
import { VideoCameraThought, CalculatorThought, MugThought } from './art/ThoughtIcons'
import { ArrowUpRight } from './icons'

const THOUGHTS: Record<JobId, ReactNode> = {
  vidux: <VideoCameraThought />,
  caballo: <CalculatorThought />,
  sziget: <MugThought />,
}

export default function Experience() {
  const { d } = useTranslate()
  const { setPopupOpen } = useConductor()
  const [openJob, setOpenJob] = useState<JobId | null>(null)

  useEffect(() => {
    setPopupOpen(openJob !== null)
  }, [openJob, setPopupOpen])

  const job = openJob ? d.experience.jobs[openJob] : null

  return (
    <section id="experience" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="04" title={d.experience.title} intro={d.experience.intro} />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 print:grid-cols-1 print:gap-4">
          <div>
            <h3 className="font-mono text-xs tracking-wide text-faint">{d.experience.workLabel}</h3>
            <ul className="mt-3 divide-y divide-hair border-y border-hair">
              {JOB_IDS.map((id) => {
                const item = d.experience.jobs[id]
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => setOpenJob(id)}
                      className="group grid w-full gap-1 py-5 text-left sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-5 print:grid-cols-[30mm_minmax(0,1fr)] print:py-2"
                    >
                      <span className="pt-1.5 font-mono text-xs text-faint">{item.period}</span>
                      <span>
                        <span className="block font-display text-2xl tracking-tight print:text-[12pt]">{item.role}</span>
                        <span className="block text-sm text-muted">{item.org}</span>
                        <span className="mt-2 block text-sm leading-relaxed text-muted print:mt-0.5">{item.summary}</span>
                        <span className="link-draw mt-3 inline-flex items-center gap-1 font-mono text-xs print:hidden">
                          {d.experience.details}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-wide text-faint">{d.experience.educationLabel}</h3>
            <ul className="mt-3 divide-y divide-hair border-y border-hair">
              {EDUCATION_IDS.map((id) => {
                const item = d.experience.education[id]
                return (
                  <li key={id} className="grid gap-1 py-5 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-5 print:grid-cols-[30mm_minmax(0,1fr)] print:py-2">
                    <span className="pt-1.5 font-mono text-xs text-faint">{item.period}</span>
                    <span>
                      <span className="block font-display text-2xl tracking-tight print:text-[12pt]">{item.role}</span>
                      <span className="block text-sm text-muted">{item.org}</span>
                      <span className="mt-2 block text-sm leading-relaxed text-muted print:mt-0.5">{item.summary}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      <Modal
        open={job !== null}
        onClose={() => setOpenJob(null)}
        labelledBy="job-dialog-title"
        aside={openJob && <ConductorStage visible thought={THOUGHTS[openJob]} />}
      >
        {job && openJob && (
          <div className="pr-12">
            <p className="font-mono text-xs text-faint">{job.period}</p>
            <h3 id="job-dialog-title" className="mt-1.5 font-display text-3xl tracking-tight">
              {job.role}
            </h3>
            <p className="text-sm text-muted">{job.org}</p>
            <p className="mt-5 leading-relaxed">{job.intro || job.summary}</p>

            <h4 className="mt-7 font-mono text-xs tracking-wide text-faint">{d.experience.tasksLabel}</h4>
            <ul className="mt-3 space-y-2.5">
              {job.tasks.map((task) => (
                <li key={task} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>

            {openJob === 'vidux' && (
              <>
                <h4 className="mt-7 font-mono text-xs tracking-wide text-faint">{d.experience.stackLabel}</h4>
                <dl className="mt-3 space-y-2 text-sm">
                  {VIDUX_STACK.map(({ key, items }) => (
                    <div key={key} className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)]">
                      <dt className="text-muted">{d.experience.stackGroups[key]}</dt>
                      <dd>{(items ?? d.experience.methodologyItems).join(' · ')}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
        )}
      </Modal>
    </section>
  )
}
