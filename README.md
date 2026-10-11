# Birkl Erik András — Portfolio & CV

Single-page portfolio and CV of **Birkl Erik András**, software engineer in Budapest.

An editorial, print-like design (warm paper, ink, one yellow accent). The
navigation is a small tram line: the fixed navbar has an overhead wire and a
rail, every section is a stop, and a yellow Budapest tram drives to the section
you are reading. Its conductor is the site's mascot.

## Features

- **Tram navbar.**
  - Stops are the sections (Rólam, Eszköztár, Projektek, Tapasztalat, Kapcsolat).
  - On arrival a speech bubble shows the stop and the next one ("Következő megálló").
  - Clicking a stop scrolls there.
  - On mobile the stops move into a menu.
- **The conductor.**
  - Tips his cap when the tram departs, and his eyes follow the cursor.
  - Gets off at the Projects stop to type on a laptop next to the KERIAN project (work in progress).
  - Stands next to the job popups with a thought bubble.
  - "Punches" sent messages like an old BKV ticket.
- **Day and night themes.** The switch spreads out in a circle from the toggle (View Transitions API). At night the tram's windows and headlight light up.
- **Hungarian and English.** All copy lives in `src/i18n/hu.json` and `src/i18n/en.json`. The Hungarian file is type-checked against the English one.
- **Contact form.** It posts to Formspree and has a honeypot field. There is also a copy-email button.
- **CV.**
  - The "Download CV" button downloads the PDF in `public/cv/`; the paths are set in `src/data/profile.ts`.
  - Without a PDF it opens the print dialog instead. The print stylesheet lays the page out as a CV.
- **Accessibility.** Respects `prefers-reduced-motion`, has visible focus rings, and the decorative art is hidden from screen readers.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (build tooling)
- [Tailwind CSS v4](https://tailwindcss.com/) (styling)
- Hand-drawn inline SVG and CSS animations for the tram and the conductor (no animation library)
- Fonts: **Fraunces** (display), **IBM Plex Sans** (body), **IBM Plex Mono** (labels)

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build → dist/
npm run lint     # oxlint
npm run preview  # preview the production build locally
```

Optional: copy `.env.example` to `.env.local` to send the contact form to your own Formspree endpoint.

## Project structure

```
src/
├─ components/
│  ├─ TramNavbar.tsx       # fixed navbar: street, stops, tram, speech bubble, mobile menu
│  ├─ Hero.tsx, About.tsx, Skills.tsx, Projects.tsx, Experience.tsx, Contact.tsx, Footer.tsx
│  ├─ Modal.tsx            # accessible dialog (job popups)
│  ├─ CvButton.tsx         # PDF link or print dialog
│  ├─ LanguageToggle.tsx, ThemeToggle.tsx
│  └─ art/                 # Tram, Conductor, ConductorStage, LaptopScene, ThoughtIcons
├─ conductor/              # where the conductor is right now (context) + shared pointer tracking
├─ data/                   # profile links, CV paths, skills, jobs, KERIAN stack, stop ids
├─ hooks/                  # useActiveSection, useMediaQuery
├─ i18n/                   # en.json, hu.json, LanguageProvider
├─ theme/                  # ThemeProvider (day/night)
├─ App.tsx
├─ main.tsx
└─ index.css               # theme tokens, tram/conductor animations, print styles
```

---

© 2026 Birkl Erik András
