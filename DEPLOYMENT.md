# Deploying the YSSE Frontend to Vercel

The build is already verified (`npm run build` → EXIT 0). This repo deploys
straight to Vercel via `vercel.json`.

## Fastest path (5 minutes)

1. Go to **https://vercel.com/new** and import
   `shahed-hassan-fz-rabbi/Ysse-Mian-Portale-Frontend`.
2. Framework preset: **Vite** (auto-detected). Root Directory: leave default
   (this repo IS the frontend). Build Command / Output Directory come from
   `vercel.json` (`npm run build` / `dist`).
3. In **Environment Variables** (all three environments), add:

   | Name | Example / where to get it |
   |------|---------------------------|
   | `VITE_API_URL` | `https://ysse-api.onrender.com` (the Render service URL from the backend deployment) |
   | `VITE_SUPABASE_URL` | Supabase → Project Settings → API → **Project URL** |
   | `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → **anon / publishable key** |

   These are browser-inlined variables. Only public configuration may use the
   `VITE_` prefix — the service-role key must NEVER be added to Vercel.
   If the backend is not deployed yet, set `VITE_API_URL` to a placeholder
   you will replace, then add the real value before users log in.
4. Click **Deploy**. SPA routing works via the rewrite in `vercel.json`
   (all paths → `/index.html`; static assets keep filesystem precedence).

## Notes

- Changing any `VITE_*` variable requires a **new deployment** — Vite inlines
  the values at build time.
- After both frontend and backend URLs exist, open the deployed site,
  check DevTools → Network that API calls hit the Render URL, and add the
  Vercel origin to the backend's `FRONTEND_URL` (see the backend README).
- If a variable is missing at build time the app still renders public
  content and logs a clear console error it can be spot-fixed with a redeploy.
