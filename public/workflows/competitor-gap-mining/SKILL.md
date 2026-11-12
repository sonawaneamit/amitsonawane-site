---
name: "competitor-gap-mining"
description: "Mine public signals about competitors to find growth gaps: robots.txt and sitemap.xml intel (hidden landing pages, new comparison and alternative pages, recently changed URLs), public ad libraries (ads running longest), web archive snapshots (pricing and headline changes), keyword and page gaps, and a dated growth timeline across search, AI answers, ads, social and partnerships. Use before planning content, ads or positioning against named competitors."
---

# Competitor gap mining

## Goal
Use only public information to learn what competitors do to grow, find the gaps, and decide what to build first.

## Inputs
Ask for: 3 to 5 competitor domains, the user's site, the time window (default 12 months), market, and any keyword tool export.

## Step 1. Public files
For each competitor run `scripts/site_intel.py https://{{competitor}} --days 90`. It reads:
- `/robots.txt`. Disallow lines often point at paths kept out of search, such as paid landing pages (`/lp/`, `/go/`, `/demo-`), webinars and test pages. Open the ones that are public pages.
- Every sitemap listed in robots.txt (or `/sitemap.xml`), including nested and gzipped sitemaps, with `lastmod` dates. Output: `{{domain}}_urls.csv`, tagged by page type (compare, alternative, pricing, landing, template, integration, use case, location).
Also search `site:{{competitor}} -site:www.{{competitor}}` and common marketing subdomains (`go.`, `info.`, `pages.`, `try.`, `get.`) for landing pages hosted on marketing tools. Open 3 landing pages side by side: a headline they all share is usually the winner of their tests.

## Step 2. New and hidden pages
From the URL list:
- Count pages by type. Many "vs" and "alternative" pages mean they compete for switchers in search. Many location or template pages mean programmatic SEO.
- List pages with `lastmod` in the last 90 days. New comparison pages show who they plan to go after next.
- Note gated content (ebooks, webinars) and free tools.

## Step 3. Ads
In a browser (ad libraries usually block scripts):
- Meta Ad Library (`facebook.com/ads/library`): search the competitor's page, filter to active ads and your country. Each ad shows the date it started running. Ads running 60 to 90+ days are usually profitable. Record hook, format, offer and landing page.
- Google Ads Transparency Center (`adstransparency.google.com`): search the domain for search, display and video ads by region.
- Other public ad libraries or creative centers (for example on LinkedIn and TikTok) when relevant.
Save `ads.md`: ad, platform, started, days running, hook, offer, landing page.

## Step 4. History
Use the web archive's public index to see when key pages changed:
`https://web.archive.org/cdx/search/cdx?url={{competitor}}/pricing&output=json&fl=timestamp,statuscode,digest&collapse=digest&from={{YYYY}}`
Each row is a version with different content. Open one with `https://web.archive.org/web/{{timestamp}}/{{url}}`. Do this for the home page and the pricing page. Record price changes, plan changes, headline changes and new claims, with dates.

## Step 5. Other public signals
Use what is available:
- Search: a keyword tool export of their organic keywords, or what ranks for your top 30 queries (search them).
- AI answers: are they named or cited for your category questions (see ai-answer-visibility)?
- Content and social: posting cadence, top posts, newsletter, podcast, launches.
- Integrations and partner pages, affiliate or referral programs, marketplace listings.
- Hiring: open roles show where they invest (several SEO or growth roles = investment there).
- Company announcements (launches, funding, milestones) right before a jump in attention.

## Step 6. Timeline
Write `timeline.md`, one table per competitor, oldest first:
`| date | channel (search/AI/ads/social/product/partnership/pricing) | move | evidence (URL or snapshot) | likely effect |`
Then 3 lines: what drives their growth, what they will likely do next, what is fragile.

## Step 7. Gaps and plan
Write `gaps.md`:
- Keywords and page types they have and you do not, ranked by likely value.
- Comparison and alternative pages that mention you or your category.
- Claims and offers in their long-running ads that you can beat honestly.
Write `plan.md` with the first 5 builds. Common first picks: an honest "{{you}} vs {{competitor}}" page for each main competitor (before their page about you ranks), "{{competitor}} alternatives" pages, the page type behind their fastest-growing URL set, and one ad test on their longest-running angle with your own proof.

## Guardrails
- Public information only: public files, ad libraries, archives and pages. No logins to their product, no form fills under false names, no scraping behind logins.
- A Disallow line is a request to crawlers, not a secret. Visit only public pages.
- Do not copy their text, images or ads. Learn the pattern, then make your own.
- Comparison pages are fair, factual and dated, and say where the competitor is better.
- Keep sitemap crawling polite (the script pauses between files).
