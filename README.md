# internee.pk — Immersive Redesign

**🔗 Live site:** [internee-pk-redesign-khaki.vercel.app](https://internee-pk-redesign-khaki.vercel.app)

A React-based redesign of [internee.pk](https://internee.pk), built with a sophisticated dark theme, real Three.js 3D scenes that respond to scroll and pointer, and a fully responsive layout. Submitted for **Internship Task 1**.

> **Stack:** Vite · React 18 · Three.js + React Three Fiber + Drei · Framer Motion · Lenis (smooth scroll) · Tailwind CSS · Lucide icons

---

## Quick start

```bash
# from this folder
cd "D:/Intenship Task 1/internee-redesign"
npm install
npm run dev
```

Open the printed URL (default `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

---

## What's inside

```
internee-redesign/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── three/
│   │   │   ├── HeroScene.jsx        # hero: orb + glass torus knot + shards + parallax rig
│   │   │   ├── ScrollScene.jsx      # process section: scroll-reactive floating shapes
│   │   │   └── StatsScene.jsx       # stats section: 1400-particle additive field
│   │   ├── Navbar.jsx               # sticky glass nav + animated mobile drawer
│   │   ├── Hero.jsx                 # 3D hero w/ gradient headline + KPIs
│   │   ├── About.jsx                # scroll-parallax dashboard card + pillars
│   │   ├── Tracks.jsx               # 3D tilt-on-hover cards (6 tracks)
│   │   ├── HowItWorks.jsx           # 4-step timeline + scroll-bound 3D backdrop
│   │   ├── Stats.jsx                # animated number counters over particle field
│   │   ├── Testimonials.jsx         # auto-rotating carousel (pauseable, keyboard friendly)
│   │   ├── Contact.jsx              # form with full client-side validation
│   │   ├── Footer.jsx               # newsletter + sitemap
│   │   └── Loader.jsx               # brand reveal
│   ├── hooks/
│   │   ├── useLenis.js              # smooth scrolling + anchor handler (respects reduced-motion)
│   │   └── useFormValidation.js     # rule-based validator, touched/error/submit-state machine
│   ├── data/
│   │   └── content.js               # tracks, process, stats, testimonials, nav, footer
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                    # tokens + glass + buttons + utilities
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## Task checklist

### 1. Responsive Design & UI

- Built with **Vite + React 18**, mobile-first.
- Breakpoints: `sm 640 / lg 1024 / xl 1280` via Tailwind.
- Mobile drawer navigation (Navbar.jsx) with focus management, body-scroll lock, and animated entry. Desktop nav becomes a sticky glass pill.
- All sections collapse to single-column on mobile, fluid up to a 1280px max container.
- 16px base body type, line-heights ≥ 1.5, never under 12px.

### 2. Interactive & Dynamic UI

- **Three 3D scenes** (HeroScene, ScrollScene, StatsScene) — real Three.js geometries, transmissive materials, environment lighting, sparkles, and a particle field. They react to **scroll** (via `window.scrollY` ref) and to **pointer** (parallax rig).
- **Framer Motion** entrance + scroll animations on every section, with `[0.16, 1, 0.3, 1]` ease for an "expressive" feel (not linear, not bouncy).
- **3D tilt-on-hover** track cards (Tracks.jsx) — true perspective transforms tied to mouse position.
- **Auto-rotating testimonial carousel** with pause-on-hover, direction-aware enter/exit, keyboard buttons, and progress dots.
- **Animated number counters** for stats (Framer `useMotionValue` + `animate`).
- **Lenis smooth scrolling** with anchor interception — falls back instantly when `prefers-reduced-motion` is set.

### 3. Form Validation & User Experience

`src/components/Contact.jsx` + `src/hooks/useFormValidation.js`:

- Rule library: `required`, `minLen`, `maxLen`, `email`, `pattern`.
- Validation runs **on blur** (not on every keystroke — Material guideline) and **before submit**.
- Errors render under the field with `role="alert"` + `aria-describedby`.
- `aria-invalid` on every invalid input.
- On submit-with-errors, the first invalid field is auto-focused and scrolled into view (WCAG focus-management).
- Submit button has four states: `idle`, `submitting` (spinner), `success` (check), `error`.
- Character counter on the textarea; `maxLength={800}` enforced.
- Semantic input types (`email`, `tel`) trigger correct mobile keyboards.
- Phone regex is permissive enough for international and local formats.
- Success state announces via `role="status"` + `aria-live="polite"`.

### 4. Code Quality & Testing

- **Component-based** — every section is a single responsibility module under `src/components/`.
- **Data + UI separated** — copy and structure live in `src/data/content.js` so non-engineers can edit text without touching JSX.
- **Hooks** isolate behavior: `useLenis` (smooth scroll), `useFormValidation` (form state machine).
- **No dead code, no `any`-style escape hatches.** Plain ES modules, JSX, prop drilling kept shallow.
- **Manual test plan** (run after `npm run dev`):
  1. Resize from 360 → 1440 px. No horizontal scroll, all sections reflow, mobile drawer opens above 1024 → toggles to desktop nav.
  2. Submit the empty form → 5 inline errors appear, first invalid field receives focus.
  3. Submit with invalid email (`foo`) and short message (`hi`) → field-level errors update on blur.
  4. Submit with valid data → button shows spinner → success toast appears for ~4.5 s, form resets.
  5. Enable OS reduced-motion → smooth scrolling and entrance animations stop; content is still readable.
  6. Tab through the page → focus rings visible on every interactive element; `Skip to content` link appears on first Tab.

### 5. Documentation & Maintenance

- This README documents structure, run scripts, manual tests, and design decisions.
- Each component is small (~100–250 lines) and named after what it does.
- Design tokens (colors, radii, fonts, glass) live in `src/index.css` and `tailwind.config.js` — change them once, propagate everywhere.

---

## Design system

**Theme:** _Cosmic Editorial_ — deep midnight base with violet → cyan → gold gradient highlights. Glassmorphism is used purposefully for elevation, never as decoration.

| Token | Value | Use |
|---|---|---|
| `--bg-base` | `#06060c` | Page base |
| `--bg-deep` | `#0a0a14` | Section base |
| `--bg-elevated` | `#10101c` | Cards / surfaces |
| `--violet` | `#8b5cf6` | Primary action / accent |
| `--cyan` | `#22d3ee` | Secondary accent |
| `--gold` | `#fbbf24` | Hero highlight |
| `--text-primary` | `#f8f8fc` | Body |
| `--text-secondary` | `rgba(248,248,252,0.72)` | Supporting |
| `--text-tertiary` | `rgba(248,248,252,0.5)` | Meta |

**Typography**

- Display: _Bricolage Grotesque_ (300–800, optical sizing) — used for headlines and section titles, lends an editorial-but-modern feel.
- Body: _Inter_ — readable across weights.
- Mono: _JetBrains Mono_ — for eyebrows, stat suffixes, and step numbers.

**Why this isn't AI slop**

- One coherent palette, one typeface family per role (display / body / mono). No emoji-as-icon, no random-stock-image grid.
- 3D is **load-bearing** — it expresses scroll position and pointer movement, not decoration.
- Motion has a single rhythm: 0.6–0.7s sections, 0.4–0.5s components, 0.16–0.3 expressive ease, all interruptible.
- Type hierarchy is enforced by weight + size + tracking, not color.
- Every glass surface has a defined border (`--border-soft` / `--border-strong`) — no fuzzy dark-on-dark hierarchy.

---

## Accessibility

- All text meets WCAG **4.5 : 1** contrast against its background on the base theme.
- Focus rings on every interactive element (`focus-visible` outline + offset).
- `Skip to content` link as the first focusable element.
- `prefers-reduced-motion` disables Lenis and short-circuits Framer transitions.
- Mobile drawer locks body scroll and closes on backdrop click.
- Touch targets ≥ 44 × 44 px (buttons, nav items, social icons).
- Form: visible labels, `aria-invalid`, `aria-describedby`, focus-management on submit error, live region for success.
- Semantic landmarks: `<header>`, `<main>`, `<section id>`, `<footer>`, `<nav aria-label>`.

---

## Performance notes

- **Code split** — `three`, `@react-three/fiber`, `@react-three/drei` are bundled into a `three-vendor` chunk; Framer + Lenis into `motion-vendor`. Keeps the initial JS payload smaller.
- **DPR clamped** — every Canvas runs with `dpr={[1, 1.5]}` (1.75 on hero) to avoid burning GPU on retina laptops.
- **`Suspense`** wraps every R3F tree so the page never blocks on Drei materials.
- **No layout thrash** — animated properties are `transform` and `opacity` only.
- **Particle field** uses `BufferGeometry` + `AdditiveBlending` — 1400 points run at 60 fps on integrated GPUs.

---

## Browser support

Chromium 100+, Firefox 100+, Safari 15.4+. Tested mental-model on 375 / 768 / 1024 / 1440 widths.

---

## License

Educational / personal use only — built as Internship Task 1 submission. internee.pk branding belongs to internee.pk.
