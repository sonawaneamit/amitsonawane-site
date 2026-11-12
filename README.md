# amitsonawane.com

Personal site for Amit Sonawane, served by a Cloudflare Worker with static assets.

- `public/` — the site (single page, hash routes), logos, photos, and workflow downloads.
- `src/worker.js` — `/api/book` (free audit time request) and `/api/send` (problem + files). Both check Cloudflare Turnstile and email the submission through the `send_email` binding to the verified Email Routing destination.
- Settings: `TURNSTILE_SECRET` is a Worker secret set in the dashboard. The Turnstile site key is in `public/index.html`.

Pushing to `main` deploys through Workers Builds.
