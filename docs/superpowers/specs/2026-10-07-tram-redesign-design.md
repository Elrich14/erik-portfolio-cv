# Tram redesign — Design

Agreed in chat on 2026-10-05 … 2026-10-07. The user asked to implement right away and review this document later.

## Goal

Replace the current "typical AI landing page" look (navy + emerald gradient, glass cards, particle canvas) with a simple, personal, editorial design, and make the site's copy plain and factual.

## Visual direction

- **Editorial, print-like.** Warm paper background, ink-coloured text, hairlines and thin ink borders instead of glass cards and shadows. No gradient text, no particle canvas, no grain.
- **Fonts.** Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (meta labels). All three cover Hungarian ő/ű.
- **Palette.**

  | Token | Day | Night |
  |---|---|---|
  | `bg` (paper) | `#F3EFE6` | `#16140F` |
  | `paper` (cards) | `#FFFDF8` | `#1F1C17` |
  | `bar` (navbar) | `#ECE6D9` | `#1D1A15` |
  | `ink` / `text` | `#1B1A17` | `#EFE8D8` |
  | `muted` | `#4A453D` | `#CFC7B8` |
  | `faint` | `#6B655B` | `#A39B8B` |
  | `hair` | `#D6CDBC` | `#36312A` |
  | `tram` (accent) | `#F2C230` | `#E8B923` |

- **Themes.** Day is the default for first-time visitors and night is opt-in. The choice persists, and an inline script in `index.html` sets it before the first paint.

## Tram navbar (signature element)

- **Layout.** A fixed top navbar, about 92 px tall on desktop, built like a small street: an overhead wire at the top and a rail near the bottom. Name on the left, language and theme toggles on the right.
- **Stops.** The stops are the sections: home, Rólam/About, Eszköztár/Toolkit, Projektek/Projects, Tapasztalat/Experience, Kapcsolat/Contact. On desktop their labels sit under the rail and work as the menu.
- **The tram.**
  - A flat yellow tram with a thick ink outline and a pantograph touching the wire.
  - Whenever the active section changes, it drives to that section's stop (discrete moves, not continuous scroll-linking).
  - Fast scrolling retargets a tram that is already moving.
- **Speech bubble.**
  - Opens downward under the navbar after the tram arrives at a stop.
  - Content: the stop's title (the home stop shows the name), plus "Következő megálló: X" / "Next stop: X". The last stop says "Végállomás" / "Last stop".
  - Auto-hides after ~3.5 s, and hovering the tram shows it again.
- **Night mode.**
  - The windows light up.
  - The round headlight at the lower front corner flickers on, gets a soft halo and throws one translucent beam down to the ground.
  - The beam ends in an oval pool of light on the rail, with a bright glint on the rail inside the pool.
- **Mobile (< 1024 px).** A smaller tram, no stop labels, and dots only. The street opens a menu panel that lists the stops and holds the toggles.

## The conductor ("kalauz") — the user's mascot

A moustached tram conductor in a navy uniform, peaked cap and ticket bag, drawn in the same flat, outlined style. He is in exactly one place at a time:

| Where | When |
|---|---|
| Tram's open rear platform (holding the pole) | default |
| Next to the job popup, with a thought bubble | a job popup is open |
| Next to the KERIAN project, peeking over a laptop | the tram is at the Projects stop |
| On top of the contact form, holding a ticket | the tram is at the Contact stop (or a ticket punch is still running) |

Behaviours:
- **Departure.**
  - He tips his cap when the tram departs from a stop.
  - When the tram leaves the Projects stop, he first gets back on, then tips his cap.
- **Laptop scene (KERIAN, "work in progress").**
  - He gets off at the Projects stop and works on a laptop next to the project card.
  - Code lines type on the screen, there's a steaming mug and a code-icon thought bubble.
  - When he's away, the laptop stays and only the cursor blinks.
- **Job popups.** Opening a job (Vidux, Caballo Verde, Sziget) shows him at the popup's edge with a thought-bubble icon: video camera, calculator, beer mug.
- **Contact stop (ticket check).**
  - He gets off at the Contact stop and waits on top of the form with an unpunched ticket in his thought bubble.
  - After a successful send he punches the ticket (like an old BKV ticket), a red VALIDATED stamp lands on it, and he tips his cap.
  - The validated ticket stays until the visitor starts a new message. When the tram leaves, he gets back on.
- **Copying the e-mail address.** The button confirms the copy, and the conductor tips his cap, wherever he is standing.
- **Eyes.** His eyes follow the mouse ("a kalauz figyel"). This is off under `prefers-reduced-motion`.

## Effects and features (chosen by the user)

- **Theme switch.**
  - It uses a circular reveal from the toggle (View Transitions API), with an instant fallback.
  - The headlight flickers on when switching to night.
- **Links.** On hover, the underline draws in from left to right.
- **CV.**
  - The "download CV" button links to PDFs once they are in `public/cv/`.
  - Until then it opens the print dialog. The page has a print stylesheet so it prints as a clean CV.
- **Copy e-mail.** A button copies the e-mail address.
- **Kept as before.** Job details stay in popups (modal), not inline. No screenshot gallery.

## Sections and copy

The source of truth is `src/i18n/hu.json` and `src/i18n/en.json`. Rules from the user:
- Facts only. No self-praise, no persuasion, no "this is me" notes.
- No em dashes. Avoid calques and the noun-heavy style in Hungarian.

The sections:
1. **Hero.**
   - Eyebrow: "Szoftverfejlesztő · Budapest" / "Software Engineer · Budapest".
   - Name: HU "Birkl Erik András", EN "Erik András Birkl".
   - Then a one-line lead, the availability line (remote, hybrid and on-site, open to relocation), and two buttons: CV and contact.
2. **Rólam / About.**
   - Portrait and three short paragraphs: path (media high school, Szeged, Vidux), interest (design to code), hobbies (motorcycling, tinkering on cars, 3D printing, languages).
3. **Eszköztár / Toolkit.** Grouped plain lists. Vite was removed because the user has never used it.
4. **Projektek / Projects.**
   - The KERIAN card: description, four highlights, stack and GitHub link.
   - Plus the laptop scene.
5. **Tapasztalat / Experience.**
   - Jobs open popups: Vidux (Szoftverfejlesztő), Caballo Verde (data entry, "monotonous, detail-heavy work is fine"), Sziget (segédpultos/barback, "long shifts, few breaks").
   - Education is listed without popups.
6. **Kapcsolat / Contact.**
   - E-mail (with copy), phone, location, LinkedIn, GitHub, CV.
   - Formspree form with a honeypot field.

## Fixes bundled with the redesign

- **Portrait metadata.** Strip EXIF/GPS from `public/portrait.jpg`, which exposed where the photo was taken.
- **Translations.** Move all hardcoded English strings (dates, organisation names, tags) into the dictionaries. `document.title` and the meta description follow the language.
- **Contact form.** Remove the dead mailto fallback and its translation keys. `VITE_FORMSPREE_ENDPOINT` still overrides the default endpoint.
- **Accessibility.**
  - Visible scrollbar again.
  - Visible focus rings.
  - Small text meets AA contrast in both themes.
  - Motion respects `prefers-reduced-motion`.
  - The language button names the target language.
- **Removed.** The constellation canvas, grain and glass styles, unused icons and keyframes.
- **Docs.** Updated README.

## Out of scope / follow-ups

- Self-hosting the fonts (GDPR, performance).
- `og:image` and canonical URL (needs the final domain).
- The real CV PDFs.
- Running the copy through the Humanizer / anti-ai-writing plugins (not installed yet).
- A prerendered HTML version of the site for crawlers (SEO).
- CI and deploy.

## Verification

- `npm run build` and `npm run lint` pass.
- Manual check in the dev server:
  - Desktop and mobile, day and night, HU and EN.
  - Stop navigation and bubble.
  - Cap tip on departure.
  - Laptop scene at Projects.
  - Job popups with the conductor.
  - E-mail copy.
  - Form send, with the network call stubbed so no real message goes out.
