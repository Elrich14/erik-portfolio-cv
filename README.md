# Birkl Erik András — Portfolio & CV

A modern, single-page portfolio and CV built for **Birkl Erik András**, Frontend
Developer & Computer Engineering student.

Dark, glassmorphic UI with an emerald/blue palette, sitting on top of a native
HTML5 `<canvas>` **constellation** animation that reacts to the cursor.

## ✨ Features

- **One-page layout** — Hero, About, Skills, Experience & Education, Contact.
- **Glassmorphism** — translucent, `backdrop-blur` cards and navbar with subtle
  white borders and soft shadows.
- **Constellation background** — ~100 slowly drifting stars on the bottom layer
  (`z-index: -2`); nearby stars link with faint emerald lines, and stars near
  the cursor link to it with faint blue lines. Stars are seeded at random
  positions across the whole viewport.
- **No scroll-reveal animations** — all content is immediately in place and
  readable on load; motion is limited to hover micro-interactions.
- **Fully responsive** — mobile-first, with a glass hamburger menu.
- **Mock contact form** — simulates sending with a spinner, then a success state.
- **Accessible touches** — respects `prefers-reduced-motion`, semantic markup,
  ARIA labels.

## 🧱 Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (build tooling)
- [Tailwind CSS v4](https://tailwindcss.com/) (styling)
- Native HTML5 Canvas (constellation animation — no libraries)
- Fonts: **Bricolage Grotesque** (display), **Instrument Sans** (body),
  **JetBrains Mono** (accents)

## 🎨 Design Tokens

| Token         | Value     | Role              |
| ------------- | --------- | ----------------- |
| Background    | `#020617` | Slate-950 base    |
| Primary       | `#10b981` | Emerald           |
| Secondary     | `#3b82f6` | Blue              |

## 🚀 Getting Started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build → dist/
npm run preview  # preview the production build locally
```

## 📁 Project Structure

```
src/
├─ components/
│  ├─ ConstellationCanvas.tsx   # native canvas background animation
│  ├─ Navbar.tsx                # glass navbar + mobile hamburger
│  ├─ Hero.tsx                  # intro + CTAs
│  ├─ About.tsx                 # mindset + soft-skill cards
│  ├─ Skills.tsx                # categorized skill bento grid
│  ├─ Experience.tsx            # timeline of work & education
│  ├─ Contact.tsx               # details + mock form
│  ├─ Footer.tsx
│  ├─ SectionHeading.tsx        # reusable numbered section header
│  └─ icons.tsx                 # dependency-free icon set
├─ App.tsx
├─ main.tsx
└─ index.css                    # Tailwind theme + base + components
```

---

© 2026 Birkl Erik András
