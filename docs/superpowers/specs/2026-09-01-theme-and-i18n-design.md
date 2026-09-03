# Dark/Light Theme + EN/HU Localization — Design

## Goal

Add two cross-cutting, user-toggleable features to the portfolio site:

1. A **dark/light theme switch**, defaulting to dark, persisted across visits.
2. A **language switch between English and Hungarian**, defaulting to English,
   covering the full copy of the site (including long-form prose like the
   About paragraphs, Projects description and Experience bullets — not just
   nav/button chrome), persisted across visits.

Both are bundled into a single spec because they touch nearly every
component in the same way (wrapping the app in a provider, reading from a
hook instead of a hardcoded string/class), but they are implemented as two
independent, decoupled systems — a project could ship one without the other.

## Non-goals

- No more than two languages for now. The mechanism should not hardcode
  "en/hu" pairs everywhere, so a third language can be added later by
  dropping in a new JSON file and one line of config, but building that
  third language is out of scope today.
- No automated test suite is being introduced. This repo has none today
  (no vitest/jest in `package.json`); verification is `tsc -b && vite
  build` plus manual check in the dev server, consistent with how the rest
  of the project has been verified so far.
- No system-preference-based initial theme guess. First-time visitors
  always see dark; only an explicit user choice (persisted) changes that.
- Technology/proper-noun tokens (tech stack chips, skill items, tags, org
  names, the person's own name, email/phone/URLs) are not translated —
  only human-authored prose and UI labels are. See "What gets translated"
  below.

## Architecture

Two independent React contexts, both mounted in `main.tsx` around `<App />`:

```
src/theme/ThemeContext.tsx     ThemeProvider, useTheme()
src/i18n/LanguageContext.tsx   LanguageProvider, useTranslate()
src/i18n/en.json
src/i18n/hu.json
```

### Theming

- `index.css` gains a full set of semantic color tokens in `@theme` (in
  addition to the existing `--color-brand`/`--color-accent`/`--color-ink`):
  `--color-bg`, `--color-surface` (glass fill), `--color-border`,
  `--color-text`, `--color-text-muted`, `--color-text-faint`. These are
  defined once for dark (the current values, on `:root`) and overridden
  under `:root[data-theme="light"]`.
- Components stop using ad-hoc `text-slate-100`, `bg-white/[0.03]`,
  `border-white/10` etc. and use the new token-backed utilities instead
  (Tailwind v4 lets `@theme` colors generate utilities like `bg-surface`,
  `text-text-muted` automatically). This is a mechanical pass across every
  component file.
- `ThemeProvider` holds `theme: 'dark' | 'light'` in state, exposes
  `toggleTheme()`, persists to `localStorage['theme']`, and sets
  `document.documentElement.dataset.theme` + updates the `<meta
  name="theme-color">` tag to match.
- A small inline script in `index.html` `<head>` (runs before React
  mounts) reads `localStorage['theme']` and sets `data-theme="light"`
  immediately if present, to avoid a flash of dark-then-light on repeat
  visits. First-time visitors have no stored value, so nothing changes —
  they see dark, matching the "dark by default" decision.
- `ConstellationCanvas` reads `useTheme()` and picks one of two small color
  objects (fill/star/link/mouse-link colors) based on the current theme,
  kept in a ref so the existing `requestAnimationFrame` loop picks up
  changes on the next frame with no restart needed. The starfield stays in
  both themes, just recolored (confirmed with you): light mode keeps
  visible link lines/particles in muted slate/emerald tones on the light
  background instead of hiding the canvas.
- A `ThemeToggle` component (sun/moon icon button, matching the existing
  icon set style in `icons.tsx`) sits in the Navbar next to the language
  toggle, in both the desktop bar and the mobile menu.

### Light palette

| Token | Dark (current) | Light (new) |
|---|---|---|
| `--color-bg` | `#020617` | `#f8fafc` |
| `--color-text` | slate-100 | slate-900 |
| `--color-text-muted` | slate-400 | slate-600 |
| `--color-text-faint` | slate-500/600 | slate-500 |
| `--color-surface` (glass fill) | `rgba(15,23,42,0.8)` | `rgba(255,255,255,0.75)` |
| `--color-border` | `rgba(255,255,255,0.08)` | `rgba(15,23,42,0.08)` |

`--color-brand` / `--color-accent` stay the same hex in both themes for
non-text uses (icons, borders, backgrounds with opacity). Where the brand
color is used as body text color against a light background (e.g. the
`.eyebrow` class, `text-brand-soft` labels), a slightly darker emerald
shade is used in light mode for AA contrast — handled inside the same
token via the light override, not a new class.

### Localization (i18n)

- `src/i18n/en.json` and `src/i18n/hu.json` mirror each other's key
  structure, grouped by section: `nav`, `hero`, `about`, `skills`,
  `projects`, `experience`, `contact`, `footer`. Example shape:

  ```json
  {
    "nav": { "about": "About", "skills": "Skills", ... },
    "hero": {
      "badge": "Open to Remote & Hybrid opportunities",
      "greeting": "Hi, I'm",
      "name": "Erik András Birkl.",
      "title": "Software Engineer",
      "subtitle": "I build clean, reliable interfaces with React and TypeScript — and I like knowing what's happening underneath them too.",
      ...
    },
    ...
  }
  ```

- `LanguageProvider` holds `lang: 'en' | 'hu'`, exposes `setLang`/
  `toggleLang`, persists to `localStorage['lang']`, and sets
  `document.documentElement.lang`. Default is always `'en'` regardless of
  browser language (per your call).
- `useTranslate()` returns a `t(key: string) => string` function that
  resolves a dot-path (e.g. `t('hero.subtitle')`) against the active
  language's JSON, with a fallback to the English value (and then the key
  itself) if a Hungarian key is ever missing, so a typo never renders
  blank.
- A `LanguageToggle` component (text toggle, "EN / HU", not flag icons —
  flags are a poor proxy for language) sits next to the `ThemeToggle` in
  the Navbar.

### What gets translated

Everything a visitor reads as language-specific prose or UI copy: nav
labels, Hero badge/greeting/title/subtitle/CTA labels, About's two
paragraphs and two competency cards, Skills' section eyebrow/title/intro
and category **titles** (not the tech items inside them — "React",
"TypeScript" etc. stay as-is in both languages), Projects' eyebrow/title/
intro/badge/tagline/description/highlight titles & bodies (not the tech
stack chips), Experience's eyebrow/title/intro, each work/education item's
role & description (not org names, not tags), the "Completed"/"Now"/
"Earlier" status words, the modal's "What I did"/"Tech stack used"
headers, Contact's eyebrow/title/intro/field labels/placeholders/button
states/status messages (not the actual email/phone/URL values), and
Footer's tagline/copyright line.

Plain data that doesn't change between languages (tech names inside
`Skills.tsx`'s `CATEGORIES`, `Experience.tsx`'s `tags`/org names/`stack`
in `Projects.tsx`, the contact detail values, image alt text where it's
just the person's name) stays as plain constants in the component files,
not duplicated into the JSON — translating "TypeScript" or "Vidux
Informatikai Kft." doesn't make sense and would just be dead weight in
both JSON files.

## Data flow

`main.tsx` → `<ThemeProvider><LanguageProvider><App /></LanguageProvider></ThemeProvider>`
Every component that currently has hardcoded copy calls `useTranslate()`
and swaps its JSX strings for `t('section.key')` calls. Components that
currently use raw Tailwind slate/white utilities for
background/text/border swap them for the new semantic token utilities.
`ConstellationCanvas` additionally calls `useTheme()`.

## Error handling

- Missing translation key → fall back to the English string, then to the
  raw key, never to a blank/undefined render (avoids a broken-looking UI
  if a key is missed during the migration).
- `localStorage` access is wrapped in try/catch in both providers (private
  browsing / storage-blocked contexts shouldn't crash the app — they just
  don't persist the choice for that session).

## Testing / verification

- `npm run build` (`tsc -b && vite build`) must stay clean throughout.
- Manual verification in the dev server: toggle theme and language
  independently, reload to confirm persistence, check the mobile menu
  variants of both toggles, spot-check a few sections in each of the four
  combinations (dark/EN, dark/HU, light/EN, light/HU).
- No automated tests added (matches existing project conventions).
