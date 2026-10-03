# Adina Vishal — Portfolio

Personal portfolio of **Adina Vishal**, Full-Stack Agentic AI Engineer.
Vite + React 19 + TypeScript, Tailwind v4, GSAP ScrollTrigger, Lenis, Motion.

---

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # typecheck + production build → dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
```

## Deploying

The repository ships with `vercel.json` (SPA rewrites, immutable asset caching,
security headers). Push to a connected branch or run:

```bash
npx vercel --prod
```

`dist/` also deploys as-is to Netlify, Cloudflare Pages or any static host.

---

## Architecture

```
src/
├─ main.tsx                    entry — arms `motion-ready`, mounts <App/>
├─ App.tsx                     section order, modal state, lazy modal chunks
├─ index.css                   design tokens, layout primitives, keyframes, print
├─ types.ts                    domain types
├─ data/portfolioData.ts       ← every word on the site lives here
├─ lib/
│  ├─ gsap.ts                  plugin registration, easings, media queries
│  ├─ scroll.ts                Lenis singleton + scrollToSection/lockScroll
│  ├─ splitText.ts             accessible line-splitting for masked reveals
│  ├─ animations.ts            useGsap / useSplitReveal / useInViewOnce / useMediaQuery
│  ├─ useScrollReveal.ts       one batched reveal trigger + parallax
│  ├─ useMagnetic.ts           magnetic attraction
│  ├─ useActiveSection.ts      scroll-spy
│  └─ cn.ts                    className joiner
├─ components/ui/              Icon, Modal, MagneticButton, Section, SectionHeading,
│                              Reveal, Tag, Marquee, Portrait, CodeBlock,
│                              ProjectPreview, Preloader, Cursor
├─ components/layout/          Navbar, Footer
├─ components/sections/        Hero, About, Projects, Experience, Skills,
│                              Architecture, Pipeline, Achievements, Contact
└─ components/modals/          Project, Resume, Experience, AllProjects,
                               ArchitectureInspector, CommandPalette
```

### Motion rules

- **GSAP + ScrollTrigger** owns everything driven by scroll position.
- **Motion** owns component enter/exit state (modals, drawers, filter pills).
- **Lenis** is driven by `gsap.ticker`, so scroll and scroll-triggers update in
  the same frame — this is what keeps pinned/parallax sections from jittering.
- Animated properties are limited to `transform` and `opacity`.
- `prefers-reduced-motion` short-circuits every effect: Lenis never instantiates,
  the preloader completes instantly, and `html.motion-ready` is never added — so
  no element is ever left hidden.

---

## Customising

**Accent colour / theme** — one place, `src/index.css`:

```css
@theme {
  --color-accent: #d4ff4f;   /* the single accent for the whole site */
  --color-bg: #08090a;
  --color-fg: #f2f2f0;
}
```

**Content** — everything (projects, experience, education, skills, achievements,
contact channels, résumé copy) lives in `src/data/portfolioData.ts`.

**Portrait** — drop a file at `public/portrait.jpg`. It is picked up
automatically. If it is missing, the Google-hosted fallback URL is tried, and if
that fails a designed typographic monogram is rendered instead. The resolution
order is `PORTFOLIO_INFO.portraitSources`.

**Résumé** — the résumé modal renders live from the data file and includes a
dedicated print stylesheet, so "Print / Save PDF" produces a clean A4 document.
Add a PDF at `public/resume.pdf` and link it from the footer if you prefer an
uploaded file.

---

## Accessibility & performance notes

- Skip link, semantic landmarks, labelled form fields, focus-visible rings.
- Split headlines expose the original sentence via `aria-label` and hide the
  decorative spans from assistive tech.
- Modals trap focus, restore focus on close, close on `Escape`, and lock scroll
  through Lenis (not just `overflow: hidden`).
- Icons are inline SVG (no icon webfont), and all six modals are code-split and
  fetched on demand.
