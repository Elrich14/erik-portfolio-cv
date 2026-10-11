import type { Lang } from '../i18n/context'

export const PROFILE = {
  email: 'elrich.020114@gmail.com',
  phoneDisplay: '+36 70 313 6282',
  phoneHref: 'tel:+36703136282',
  linkedinUrl: 'https://www.linkedin.com/in/erik-andr%C3%A1s-birkl-7b4240306',
  linkedinDisplay: 'in/erik-andrás-birkl',
  githubUrl: 'https://github.com/Elrich14',
  githubDisplay: 'github.com/Elrich14',
}

// Drop the PDFs into public/cv/ and set the paths here. While a path is null,
// the "download CV" button opens the print dialog instead (the page has a print
// stylesheet, so "Save as PDF" gives a clean CV).
export const CV_PDF: Record<Lang, string | null> = {
  hu: null,
  en: null,
}

export const FORMSPREE_ENDPOINT =
  (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim() ||
  'https://formspree.io/f/mjgnrlev'
