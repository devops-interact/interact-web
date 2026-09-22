# Executive Implementation Prompt — Interact Studio Website

Copy everything below the line into an AI coding agent to implement or extend this project.

---

## Role

You are a senior front-end engineer and motion designer. Build the **Interact** software development studio website in `/Users/marco.aurelio/Desktop/interact-web` (or repo root).

## Non-negotiable constraints

1. **Visual parity** with [https://aeye.framer.ai/](https://aeye.framer.ai/): long scroll, 11 numbered sections, terminal labels (`[n. 01 / 11]`, `> label`, `// 001`), marquees, code panel, carousel, pricing-style cards, FAQ accordion, dense footer.
2. **Monochrome only** — grayscale tokens from PRD; no blue/green accents.
3. **No lorem ipsum** — use `content/*.json` as single source of truth.
4. **Case studies** — four slugs with copy from PRD §6.
5. **Stack:** Next.js 15 App Router, TypeScript, Tailwind v4, framer-motion, Geist fonts.
6. **Deploy target:** Railway (`railway init -n interact-web   # first time only
railway up --detach`); `start` must use `$PORT` and `0.0.0.0`.

## Reference documents

- [docs/PRD.md](./PRD.md) — full requirements
- Aeye content scrape in project uploads (section order reference)

## Repository layout (target)

```
interact-web/
  app/
    layout.tsx
    page.tsx
    globals.css
    about/page.tsx
    contact/page.tsx
    work/page.tsx
    work/[slug]/page.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
  components/
    layout/Nav.tsx Footer.tsx SectionShell.tsx Marquee.tsx
    sections/Section01Hero.tsx … Section11InsightsFaq.tsx
    ui/Button.tsx Card.tsx Accordion.tsx CodeTabs.tsx ChartCompare.tsx
    work/WorkCard.tsx CaseStudyLayout.tsx
  content/
    site.json
    work.json
    faq.json
    insights.json
  lib/content.ts
  public/work/
  docs/
  package.json
  README.md
```

## Build order

1. `npx create-next-app@latest` — TS, Tailwind, App Router, `src` optional (use `app/` at root).
2. Install `framer-motion`.
3. Define CSS variables in `globals.css`; wire Tailwind theme.
4. `lib/content.ts` — typed loaders for JSON.
5. `Nav` + `Footer` + `SectionShell`.
6. Implement `Section01` through `Section11` on `app/page.tsx`.
7. `/work` + `/work/[slug]` with `generateStaticParams`.
8. `/about`, `/contact`, `not-found`.
9. Motion + `prefers-reduced-motion`.
10. `npm run build` — fix errors.
11. README Railway section.

## Component contract

```tsx
type SectionShellProps = {
  index: number;       // 1-11
  total?: number;      // default 11
  label: string;       // e.g. "Performance"
  titleLines: [string, string]; // dual headline
  children: React.ReactNode;
  id?: string;         // default section-{index padded}
};
```

## Content schemas

### `content/site.json` (populate all fields)

```json
{
  "brand": "INTERACT",
  "version": "v1.0",
  "contact": {
    "email": "hello@interact.studio",
    "phone": "",
    "location": "Monterrey, MX"
  },
  "nav": [
    { "label": "HOME", "href": "/" },
    { "label": "ABOUT", "href": "/about" },
    { "label": "WORK", "href": "/work" },
    { "label": "SERVICES", "href": "/#section-02" },
    { "label": "INSIGHTS", "href": "/#section-11" },
    { "label": "CONTACT", "href": "/contact" }
  ],
  "hero": { "lines": ["A Next-Gen Studio", "for Products That Ship."], "description": "...", "ctaPrimary": "START A PROJECT", "ctaSecondary": "VIEW WORK" },
  "pillars": [],
  "velocity": { "stats": [], "chart": {} },
  "layers": [],
  "process": [],
  "codeSamples": { "web": "", "cli": "", "ai": "" },
  "playbook": [],
  "testimonials": [],
  "engagement": { "tiers": [], "toggleLabels": ["Sprint", "Retainer"] },
  "shipLog": [],
  "marqueeTags": ["#product", "#engineering", "#design", "#ai"]
}
```

### `content/work.json`

```json
{
  "projects": [
    {
      "slug": "prevify",
      "title": "Prevify App",
      "tagline": "Prevify.mx — AI-assisted tax compliance and monitoring.",
      "tags": ["Product", "AI"],
      "challenges": ["paragraph1", "paragraph2"],
      "hypothesis": ["paragraph1", "paragraph2", "paragraph3"],
      "roles": ["..."],
      "outcomes": [{ "value": "2 Months", "label": "Design-to-deploy" }]
    }
  ]
}
```

(Full text in PRD §6 — paste verbatim into JSON arrays.)

### `content/faq.json`

```json
{ "items": [{ "id": "001", "question": "...", "answer": "..." }] }
```

### `content/insights.json`

```json
{ "posts": [{ "title": "...", "category": "Workflow", "date": "...", "excerpt": "...", "href": "#" }] }
```

## Section mapping (quick reference)

| File | Section |
|------|---------|
| Section01Hero.tsx | 01 |
| Section02Pillars.tsx | 02 |
| Section03Velocity.tsx | 03 |
| Section04Layers.tsx | 04 |
| Section05Process.tsx | 05 |
| Section06Code.tsx | 06 |
| Section07Playbook.tsx | 07 |
| Section08Testimonials.tsx | 08 |
| Section09Engagement.tsx | 09 |
| Section10ShipLog.tsx | 10 |
| Section11InsightsFaq.tsx | 11 |

## Railway — activate project

```bash
cd interact-web
brew install railway   # or npm i -g @railway/cli
railway init -n interact-web   # first time only
railway up --detach
railway variables set NODE_ENV=production
railway domain         # optional
```

`package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -H 0.0.0.0 -p ${PORT:-3000}"
  }
}
```

## Definition of done

Mirror [docs/PRD.md](./PRD.md) §10 acceptance checklist.

## Agent tips

- Prefer composition over one giant `page.tsx`.
- Use `motion` only where Aeye has motion; gate with `useReducedMotion()`.
- Case study images: CSS gradient placeholders with project title until real assets exist.
- Keep bundle lean: no heavy chart libraries — SVG for §03.

---

*End of executive prompt.*
