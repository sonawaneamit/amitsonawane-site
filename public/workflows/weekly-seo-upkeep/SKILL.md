---
name: "weekly-seo-upkeep"
description: "Run a weekly SEO maintenance loop from Search Console data: find striking-distance queries (positions 4-20), low-CTR pages and internal-link opportunities; propose title, meta description, content-refresh and internal-link changes for approval; apply approved changes with a changelog; compare results week over week. Use for any site with some search traffic."
---

# Weekly SEO upkeep loop

## Goal
Small, safe, logged improvements every week on pages that already have search demand.

## Inputs
- Search Console data for the last 28 days with both query and page. Ways to get it:
  - The Performance report export in the web interface (capped at 1,000 rows per table, and the Queries table has no page column).
  - The Search Console API: `POST https://searchconsole.googleapis.com/webmasters/v3/sites/{{siteUrl}}/searchAnalytics/query` with `dimensions: ["query","page"]`, up to 25,000 rows per request.
  - A Search Console connector or MCP server if the agent has one.
- Site content: a repo folder of markdown or HTML, CMS access, or the page URLs to fetch.
- Last week's `changelog.md`, if any.

## Step 1. Compare last week
Before anything new: for each page in last week's changelog, compare clicks, impressions, CTR and position for its target query, 7 to 14 days before vs after. Mark keep, wait, or revert. Leave changed pages alone for at least 2 weeks.

## Step 2. Find quick wins
Run `scripts/gsc_quick_wins.py {{export.csv}} --min-impr 100` (lower the minimum on small sites). It writes `quick_wins.md`:
1. Striking distance: queries at average position 4 to 20 with real impressions. These move most with small changes.
2. Low CTR for the position: clicks well under a rough expected curve. Fix the title and description.
3. Pages to link to: pages with the most striking-distance queries, with anchor candidates.

## Step 3. Propose changes
Write `changes-{{date}}.md` with one table per change type. Wait for approval before editing anything.

Titles and descriptions (low-CTR rows):
- Query words early in the title, plus a specific benefit or number and, if the content is current, the year. Under about 60 characters.
- Description: the answer plus a reason to click, about 150 characters.

Internal links (pages to link to):
- Make `targets.csv` with `url,anchor` from step 2 (anchors are queries the target ranks 1 to 20 for), then run `scripts/internal_links.py targets.csv {{content folder}} --site-prefix {{site}}`.
- Rules: 3 to 5 new links per source page at most; natural anchors already in the text; not in headings, the first sentence, or existing links; never a self-link; prefer targets in positions 4 to 15.
- Table: `| source page | anchor text | target page | target query | target position |`.

Content refresh (striking-distance pages):
- Check facts; add numbers and sources to claims that have none.
- Cover striking-distance queries the page does not answer yet, in a short section or FAQ.
- Change the date only when the content changed.
- Show an author with real experience, with a short author page.

## Step 4. Apply and log
After approval, edit through the CMS, repo or connector. Log each change in `changelog.md`: date, page, change type, before, after, target query, position and CTR before.

## Guardrails
- No edits without approval of the change table.
- No keyword stuffing; links only where they read naturally.
- Do not change URLs. If one must change, add a permanent redirect.
- One change type per page per week so results can be read.
- Upkeep adds to publishing and earning links; it does not replace them.
