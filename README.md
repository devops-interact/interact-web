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

## Deploy on Railway

1. Install the CLI:

   ```bash
   brew install railway
   # or: npm i -g @railway/cli
   ```

2. From this directory, deploy (creates/links project on first run):

   ```bash
   cd /path/to/interact-web
   railway init -n interact-web   # first time only
   railway up --detach
   ```

   Complete browser OAuth when prompted (or use the device-code link in headless environments).

3. Optional:

   ```bash
   railway variables set NODE_ENV=production
   railway variables set NEXT_PUBLIC_SITE_URL=https://your-domain.up.railway.app
   railway domain
   ```

4. Link service (if needed): `railway service interact-web`

5. Generate public URL: `railway domain` (or use the Railway dashboard)

6. Redeploy after changes: `railway up --detach` or connect GitHub in the Railway dashboard.

**Live (production):** [https://interact-web-production.up.railway.app](https://interact-web-production.up.railway.app)  
**Dashboard:** [https://railway.com/project/c43922d6-e265-4084-9ab8-1b92b9ea7b27](https://railway.com/project/c43922d6-e265-4084-9ab8-1b92b9ea7b27)

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4, framer-motion, content in `content/*.json`.
