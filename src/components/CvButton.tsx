import { useTranslate } from '../i18n/context'
import { CV_DOWNLOAD_NAME, CV_PDF } from '../data/profile'
import { DownloadIcon } from './icons'

const STYLES = {
  button:
    'inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 font-medium text-bg transition-transform hover:-translate-y-0.5',
  link: 'link-draw inline-flex items-center gap-1.5',
}

// Links to the PDF when there is one; otherwise opens the print dialog, where the
// print stylesheet turns the page into a CV that can be saved as PDF.
export default function CvButton({ variant }: { variant: keyof typeof STYLES }) {
  const { d, lang } = useTranslate()
  const pdf = CV_PDF[lang]
  const icon = <DownloadIcon className="h-4.5 w-4.5" />

  if (pdf) {
    return (
      <a href={pdf} download={CV_DOWNLOAD_NAME} className={STYLES[variant]}>
        {icon}
        {d.cv.download}
      </a>
    )
  }

  return (
    <button type="button" onClick={() => window.print()} className={STYLES[variant]}>
      {icon}
      {d.cv.download}
    </button>
  )
}
