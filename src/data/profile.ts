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

// The CV PDFs live in public/cv/. There is only an English CV for now, so both
// languages link to it; point `hu` at a Hungarian PDF once there is one. A null
// path makes the "download CV" button open the print dialog instead (the page
// has a print stylesheet, so "Save as PDF" still gives a clean CV).
export const CV_PDF: Record<Lang, string | null> = {
  hu: '/cv/Erik_Andras_Birkl_CV.pdf',
  en: '/cv/Erik_Andras_Birkl_CV.pdf',
}

// File name the browser saves the download under.
export const CV_DOWNLOAD_NAME = 'Erik_András_Birkl_CV.pdf'

export const FORMSPREE_ENDPOINT =
  (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim() ||
  'https://formspree.io/f/mjgnrlev'
