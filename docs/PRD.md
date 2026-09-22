# Interact Studio — Product Requirements Document

**Version:** 1.0  
**Date:** September 22, 2026  
**Status:** Approved for implementation  
**Reference UI:** [Aeye Framer template](https://aeye.framer.ai/) (monochrome adaptation)

---

## 1. Executive summary

**Interact** is a software development studio marketing site: long-scroll storytelling, terminal-style micro-labels, and motion patterns aligned with the Aeye template, rendered in a **strict monochrome** palette. Proof of capability comes from four case studies sourced from [marcoaurelio.mx/work](https://www.marcoaurelio.mx/work).

**Goals**

- ~90% interaction and layout parity with Aeye (section rhythm, components, motion — not pixel-perfect Framer export).
- Lighthouse: Performance ≥ 85, Accessibility ≥ 90 on `/`.
- Case study copy faithful to source portfolio pages.
- Deploy to [Railway](https://railway.com) via CLI from repository root.

---

## 2. Audience & positioning

| Segment | Need |
|---------|------|
| Founders / product leaders | Partner who ships product + brand + engineering |
| Technical leads | Full-stack delivery, AI-enabled workflows |
| Investors / partners | Evidence of shipped products and outcomes |

**Positioning statement:** Interact designs, builds, and ships digital products — from compliance tooling to marketplaces, 3D pipelines, and editorial platforms — with design-led process and production-grade engineering.

---

## 3. Scope

### In scope (v1)

- Home page with 11 numbered sections (`#section-01` … `#section-11`)
- Routes: `/`, `/work`, `/work/[slug]`, `/about`, `/contact`, custom `not-found`
- Content driven by `content/*.json`
- Monochrome design system, Framer-motion interactions, reduced-motion support
- SEO: metadata, `sitemap.ts`, `robots.ts`
- Railway deployment runbook (see §11)

### Out of scope (v1)

- CMS, auth, payments, live blog backend
- Real pricing numbers (engagement tiers use “Inquire” unless updated in `site.json`)
- Portfolio image CDN migration (placeholders until assets supplied)

### Open items

| ID | Item | Default |
|----|------|---------|
| `TBD_CONTACT` | Email, phone, address | `hello@interact.studio`, Monterrey MX |
| `TBD_CAL` | Booking link | `#contact` anchor |

---

## 4. Information architecture

### Primary navigation

| Label | Target |
|-------|--------|
| HOME | `/` |
| ABOUT | `/about` |
| WORK | `/work` |
| SERVICES | `/#section-02` |
| INSIGHTS | `/#section-11` |
| CONTACT | `/contact` |

**Chrome:** Logo “INTERACT”, CTA `LET'S TALK →`, version pill `v1.0`.

### Home sections (11)

| # | Anchor | Aeye analog | Interact title theme |
|---|--------|-------------|----------------------|
| 01 | `section-01` | Hero | Studio hero + trust metrics |
| 02 | `section-02` | Feature cards | Design · Build · Ship pillars |
| 03 | `section-03` | Performance | Delivery velocity + chart |
| 04 | `section-04` | Core layers | Discover · Deliver · Evolve |
| 05 | `section-05` | How it works | Engagement flow (4 steps) |
| 06 | `section-06` | Code install | Start a project (code tabs) |
| 07 | `section-07` | Docs grid | Playbook cards |
| 08 | `section-08` | Testimonials | Client voices carousel |
| 09 | `section-09` | Pricing | Engagement models |
| 10 | `section-10` | Changelog | Ship log |
| 11 | `section-11` | Blog + FAQ | Insights + FAQ |

### Work slugs

- `prevify`
- `itemz-gg`
- `splattr`
- `territorio-nacional`

---

## 5. Section content requirements

Copy lives in `content/site.json`, `content/faq.json`, `content/insights.json`. Section components read from these files.

**Section 01 — Hero**

- Headline pattern: duplicated stack — “A Next-Gen Studio” / “for Products That Ship.”
- Subcopy: studio value prop (design, engineering, AI-assisted delivery).
- CTAs: `START A PROJECT`, `VIEW WORK`
- Trust row: aggregate stats from case studies (4 products, funding raised, readers/users)

**Section 02 — Pillars**

- Three cards with `// 001`–`// 003`: Product Direction, Full-Stack Build, Growth & Brand
- Each: title, body, tagline chip

**Section 03 — Delivery velocity**

- Stats: e.g. `< 8 wks` concept-to-beta, `2–4×` iteration speed, `~90%` less coordination overhead
- Grayscale before/after chart (SVG)

**Section 04 — Three layers**

- Discover (strategy, research) · Deliver (build) · Evolve (operate, iterate)
- Decorative labels: CONTEXT / SIGNALS / OUTCOMES style

**Section 05 — How we work**

- Steps: Discover → Prototype → Build → Launch & iterate

**Section 06 — Code panel**

- Tabs: Web / CLI / AI
- Sample `interact` client snippet + copy button

**Section 07 — Playbook**

- 4 doc cards with `// 001` indices

**Section 08 — Testimonials**

- 6+ cards; copy written for Interact (not Aeye); carousel with prev/next

**Section 09 — Engagement models**

- Tiers: Explorer, Product Squad, Platform
- Toggle: Sprint / Retainer (replaces Monthly/Annual)
- CTA: Inquire on all tiers

**Section 10 — Ship log**

- Dated entries tied to case milestones

**Section 11 — Insights + FAQ**

- 3 insight cards (static)
- 5 FAQ accordions with `// 001`–`// 005`

**Footer**

- Newsletter placeholder, page links, social placeholders, contact block, copyright Interact 2026

---

## 6. Case studies (canonical text)

### Prevify App

- **URL:** https://www.marcoaurelio.mx/work/prevify  
- **One-liner:** Prevify.mx — AI-assisted tax compliance and monitoring.  
- **Tags:** Product, AI  

**Challenges**

Tax compliance teams across different industries juggle fragmented data, slow manual reviews, and opaque rule changes, making it hard to spot risk early or explain decisions to stakeholders.

Other concepts of tax compliance software lean too heavily toward the accounting operations of the business; they lack specific tools for live-monitoring fiscal status across vendors, clients, employees, and collaborators.

**Hypothesis**

A guided monitoring workspace that pairs AI-suggested flags with human-readable rationale, audit trails, and clear escalation paths so experts stay in control.

Prevify focuses on tax compliance and monitoring with AI-assisted workflows so teams can stay ahead of obligations without drowning in manual checks.

The experience prioritizes progressive disclosure: summaries for leadership, drill-down for analysts, and exportable evidence packs for reviews—reducing context-switching across tools.

**Role & process**

- Brand design & growth
- Product management and product direction
- Compliance UX and monitoring patterns
- Full-stack implementation

**Key outcomes**

| Stat | Label |
|------|-------|
| 2 Months | Design-to-deploy |
| $40K USD | Pre-seed raised |
| 400 Hours | QA testing |

---

### Itemz.gg

- **URL:** https://www.marcoaurelio.mx/work/itemz-gg  
- **One-liner:** Itemz.gg — Peer-to-peer virtual collectibles trading.  
- **Tags:** Marketplace, P2P  

**Challenges**

During the last few years, the digital and virtual collectibles market has boomed and bridged from the videogame industry to the blockchain ecosystem.

Given the decentralized nature of the blockchain ecosystem, a group of fellow entrepreneurs and I identified an opportunity in peer-to-peer virtual collectibles trading.

**Hypothesis**

If the user is given a proper decentralized and secure peer-to-peer marketplace platform, they can monetize their ownership of digital collectibles in an open trading market.

**Role & process**

- Brand design & growth
- Product management and product direction
- User research and service design
- Full-stack implementation

**Key outcomes**

| Stat | Label |
|------|-------|
| 100 Hours | User research |
| $10K USD | Sponsorship raised |
| +4000 | Users & community members |

---

### Splattr

- **URL:** https://www.marcoaurelio.mx/work/splattr  
- **One-liner:** 3D reconstruction from video — LongSplat / Gaussian splatting pipelines.  
- **Tags:** 3D, Product  

**Challenges**

Efficiently reconstructing and rendering high-quality 3D scenes from 2D images in real time, without the heavy computational cost and latency of traditional methods like Neural Radiance Fields.

More concretely: traditional NeRF-style approaches are slow to train and render; real-time applications (AR/VR, simulations, interactive media) require low latency; maintaining photorealistic fidelity while improving performance is non-trivial; and handling large-scale scenes without exploding memory usage is difficult.

The problem becomes: how can we represent a 3D scene in a way that is both fast to render and visually accurate, while being scalable and trainable efficiently?

**Hypothesis**

A production web application that converts video footage of rooms into interactive 3D point cloud models and reconstructed meshes using LongSplat — NVIDIA's state-of-the-art unposed 3D Gaussian splatting.

Representing a scene as a set of anisotropic 3D Gaussians (instead of dense neural fields) allows for real-time rendering with high fidelity by leveraging rasterization-friendly primitives and GPU acceleration.

Key assumptions in that approach: a scene can be approximated as volumetric Gaussians with position, covariance (shape and orientation), color, and opacity; those Gaussians can be projected ('splatted') onto the screen efficiently; sorting and blending Gaussians in screen space is much faster than volumetric ray marching; and optimization can still converge to photorealistic results with gradient-based methods.

**Role & process**

- User interface design
- Full-stack implementation

**Key outcomes**

| Stat | Label |
|------|-------|
| $20K USD | In render cost savings |
| +10K Hours | In worktime optimization |
| +800 Hours | Of successful beta testing |

---

### Territorio Nacional

- **URL:** https://www.marcoaurelio.mx/work/territorio-nacional  
- **One-liner:** TerritorioNacional.mx — Transparency-first AI news platform.  
- **Tags:** Editorial, Web  

**Challenges**

In Mexico, public trust in traditional news media has eroded significantly over the past decades. A widespread perception exists that editorial lines are influenced—directly or indirectly—by political affiliations, corporate interests, or economic dependencies.

That perception is reinforced by concentration of media ownership among a limited number of stakeholders; lack of transparency in editorial decision-making; selective framing and omission of relevant context; and increasing polarization of narratives across outlets.

Readers face information asymmetry: multiple versions of the same event, each shaped by distinct agendas. That environment generates distrust toward institutional media, difficulty identifying objective or verifiable information, reduced civic engagement from uncertainty, and increased vulnerability to misinformation and echo chambers.

The core problem is not only bias itself, but the absence of a scalable, transparent mechanism to produce and validate neutral narratives at speed and breadth.

**Hypothesis**

An AI-powered, fully or semi-automated digital news platform—territorionacional.mx—can reduce perceived and actual bias in news dissemination by leveraging algorithmic transparency, multi-source ingestion, and structured content generation.

The approach follows principles of algorithmic neutrality through design: by decoupling content generation from human editorial incentives, AI systems can aggregate information from diverse sources (institutional, independent, international), detect and highlight discrepancies across narratives, generate multi-perspective summaries rather than single-thread storytelling, and apply consistent rules for relevance, weighting, and inclusion.

While AI is not inherently unbiased, its bias can be measured, audited, and iterated—unlike opaque human editorial processes.

**Role & process**

- Brand design & growth
- Content production pipeline automation
- User interface design and development
- Full-stack implementation

**Key outcomes**

| Stat | Label |
|------|-------|
| +10.5K Readers | In 1 Month after launch |
| $10K USD | Seed money raised |
| +80 Articles | AI-assisted editorial |

---

## 7. Design system

### Color (monochrome only)

| Token | Value | Usage |
|-------|-------|--------|
| `--bg-0` | `#050505` | Page background |
| `--bg-1` | `#0c0c0c` | Section alt |
| `--bg-elevated` | `#141414` | Cards, panels |
| `--text-primary` | `#f5f5f5` | Headlines, body |
| `--text-muted` | `#8a8a8a` | Labels, secondary |
| `--border` | `rgba(255,255,255,0.12)` | Hairlines |
| `--border-strong` | `rgba(255,255,255,0.28)` | Focus, emphasis |

No chromatic accent colors in v1.

### Typography

- **Display:** Geist Sans (`next/font`)
- **Mono:** Geist Mono — section indices, `> labels`, code

### Components

- `Button` — primary (inverted), secondary (outline), ghost
- `SectionShell` — index badge, label, dual-line title, children
- `Card`, `Accordion`, `CodeTabs`, `Marquee`, `TestimonialCarousel`, `PricingToggle`

### Spacing

- Section vertical padding: `clamp(4rem, 12vh, 8rem)`
- Max content width: `1200px`
- Grid gap: `24px` / `32px` desktop

---

## 8. Interaction & motion

| Pattern | Spec |
|---------|------|
| Hero headline | Slow vertical drift on stacked lines, 8s loop |
| Section enter | `opacity` + `y: 24px`, stagger 80ms |
| Marquee | CSS animation, pause when `prefers-reduced-motion` |
| Carousel | Embla or custom; keyboard ←/→ |
| Pricing toggle | Animate price opacity on Sprint/Retainer |
| FAQ | Single-open accordion |
| Nav | Sticky, blur backdrop, mobile full-screen menu |

---

## 9. Technical requirements

- **Runtime:** Node 20+
- **Framework:** Next.js 15 App Router, TypeScript
- **Styling:** Tailwind CSS v4 + CSS variables
- **Motion:** framer-motion
- **Build:** `next build`
- **Start:** `next start -H 0.0.0.0 -p ${PORT:-3000}`

### Performance

- Static generation for marketing routes
- `next/image` for case study media when available
- Lazy-load below-fold sections where practical

### Accessibility

- WCAG 2.1 AA contrast on text pairs
- Visible focus rings (`outline` 2px)
- `aria-expanded` on FAQ; carousel controls labeled

---

## 10. Acceptance criteria

- [ ] All 11 sections render on `/` with correct anchors and nav scroll
- [ ] Monochrome only — no hue accents in UI
- [ ] Four work pages match §6 content
- [ ] `/work` lists all four projects
- [ ] Mobile nav works; reduced motion respected
- [ ] `npm run build` succeeds
- [ ] Lighthouse a11y ≥ 90 on `/` (manual or CI)
- [ ] README + Railway instructions present

---

## 11. Railway deployment runbook

### Prerequisites

- Node.js 20+
- Railway account

### Install CLI (macOS)

```bash
brew install railway
# or: npm i -g @railway/cli
```

### First deploy from repo root

```bash
cd /path/to/interact-web
railway up -y
```

- Authenticates via browser (or device code in headless environments).
- Creates project/service if none linked; Nixpacks runs `npm install`, `npm run build`, `npm start`.

### Environment

```bash
railway variables set NODE_ENV=production
```

Railway injects `PORT`; the start script must bind `0.0.0.0`.

### Custom domain

```bash
railway domain
```

### Link existing project

```bash
railway link --project <name-or-id>
railway up
```

### GitHub auto-deploy

Connect repository in Railway dashboard → Settings → Source.

---

## 12. References

- [Aeye template](https://aeye.framer.ai/)
- [Prevify case study](https://www.marcoaurelio.mx/work/prevify)
- [Itemz.gg case study](https://www.marcoaurelio.mx/work/itemz-gg)
- [Splattr case study](https://www.marcoaurelio.mx/work/splattr)
- [Territorio Nacional case study](https://www.marcoaurelio.mx/work/territorio-nacional)
