# Interact Studio Website

Monochrome marketing site for **Interact**, a software development studio. Visual rhythm inspired by [Aeye](https://aeye.framer.ai/); case studies from [marcoaurelio.mx/work](https://www.marcoaurelio.mx/work).

## Docs

- [docs/PRD.md](docs/PRD.md) — product requirements
- [docs/EXECUTIVE_IMPLEMENTATION_PROMPT.md](docs/EXECUTIVE_IMPLEMENTATION_PROMPT.md) — agent implementation brief

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

Production start binds `0.0.0.0` and uses `PORT` (default 3000).

## Hosting (Railway only)

This project is **not** deployed on Vercel. Production runs only on **Railway**.

If a Vercel project was created automatically when the repo was imported, disconnect it in the [Vercel dashboard](https://vercel.com/dashboard) → project → **Settings** → **Git** → **Disconnect**, or delete the project. Do not add `vercel.json` or connect this repo to Vercel.

## Deploy (automatic on push to `main`)

Production deploys are wired through **Railway + GitHub**:

| Step | What happens |
|------|----------------|
| 1 | Push commits to `main` on [devops-interact/interact-web](https://github.com/devops-interact/interact-web) |
| 2 | Railway detects the push and runs a new build (`npm install` → `npm run build` → `npm start`) |
| 3 | On success, **production** updates at the URL below |

**Typical workflow:**

```bash
git add .
git commit -m "Your message"
git push origin main
```

Watch builds in the [Railway project dashboard](https://railway.com/project/c43922d6-e265-4084-9ab8-1b92b9ea7b27) or with `railway logs` (CLI linked to this repo).

### Manual deploy (optional)

If you need a deploy without pushing to GitHub:

```bash
railway up --detach
```

### First-time CLI setup

```bash
brew install railway   # or: npm i -g @railway/cli
railway login
cd interact-web
railway link           # select project interact-web, service interact-web
```

### Environment variables (production)

Set in Railway → **interact-web** → **Variables**, or via CLI:

```bash
railway variables set NODE_ENV=production
railway variables set NEXT_PUBLIC_SITE_URL=https://interact-web-production.up.railway.app
```

**Live (production):** [https://interact-web-production.up.railway.app](https://interact-web-production.up.railway.app)  
**GitHub:** [https://github.com/devops-interact/interact-web](https://github.com/devops-interact/interact-web)  
**Railway:** [https://railway.com/project/c43922d6-e265-4084-9ab8-1b92b9ea7b27](https://railway.com/project/c43922d6-e265-4084-9ab8-1b92b9ea7b27)

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4, framer-motion, content in `content/*.json`.
