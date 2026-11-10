# MyTelBridge (demo)

React + TypeScript + Vite + Tailwind + Framer Motion. Frontend only; the contact form does not send anything (`src/lib/submitInquiry.ts` is the stub to replace later).

## Run locally
    npm install
    npm run dev        # development
    npm run build      # production build -> dist/

## Deploy to GitHub Pages
1. Create a GitHub repo and push this project to the `main` branch.
2. Repo **Settings > Pages > Build and deployment > Source: GitHub Actions**.
3. Each push to `main` runs `.github/workflows/deploy.yml` and publishes the site.
`vite.config.ts` uses `base: './'`, so it works at `username.github.io/repo/` and on a custom domain. The workflow copies `index.html` to `404.html` so refreshes never break.

## Custom domain (MyTelBridge.com) later
1. Rename `public/CNAME.example` to `public/CNAME` and set its single line to your domain (e.g. `mytelbridge.com`).
2. Repo **Settings > Pages > Custom domain**: enter the same domain.
3. At your DNS provider: add the four GitHub Pages `A` records for the apex domain (see GitHub docs "Managing a custom domain for your GitHub Pages site") and a `CNAME` record for `www` pointing to `<username>.github.io`. Then enable **Enforce HTTPS**.
Do not add `CNAME` before you own the domain.
