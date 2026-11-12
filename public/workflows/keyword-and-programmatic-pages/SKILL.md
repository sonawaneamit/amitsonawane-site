---
name: "keyword-and-programmatic-pages"
description: "Find low-difficulty keywords with many long-tail variants and turn them into a set of pages (one per entity such as city, tool, integration, template or comparison) built from real data, with quality gates against thin pages, internal linking and a launch checklist. Use when planning SEO for a new site or product, or scaling pages from a dataset."
---

# Keyword and programmatic pages

## Goal
Choose keywords a new or small site can rank for, and publish a set of pages (one per entity) that each answer a real search better than what ranks now.

## Inputs
Ask for: the product or idea, 3 to 10 seed terms, market and language, any keyword tool the user can access and export from, and any dataset they own or can collect.

## Step 1. Expand seeds
For each seed:
- Run `scripts/keyword_suggest.py "{{seed}}" --mode alphabet`, then `--mode questions` and `--mode compare`. It uses search autocomplete, an unofficial endpoint: keep runs small and slow.
- Add "People also ask" questions and related searches from the results page.
- Add page titles from the top 3 results and from competitors' sitemaps (see the competitor-gap-mining workflow).
Save everything to `keywords.csv`: `keyword, source, intent (buy/compare/learn/local), notes`.

## Step 2. Score keywords
If the user has a keyword tool, export difficulty and volume for every keyword and join them. Otherwise judge difficulty from the results page: forums, thin pages and old posts in the top 10 are good signs; big brands with exact-match pages are bad signs.
Score each candidate main keyword on:
- Difficulty: low (for example under 20 on the usual 0-100 tool scales, which usually means page one needs few backlinks).
- Volume: enough that a small conversion rate pays (for example 500+ a month in the main market).
- Children: number of long-tail variants. The more the better; most traffic on these sites comes from long-tail searches.
- Intent: people searching it want what the product does.

## Step 3. Pick one cluster
Pick one main keyword and its children. Write `cluster.md`: main keyword, 20 to 200 child keywords grouped by page type, why it is winnable, and what the searcher needs to see in the first screen.
Page types to consider: one per city or region, per tool or integration, per template, per use case or industry, per "{{A}} vs {{B}}", per "{{competitor}} alternative", per size or price band.
If the product is still being shaped, use the main keyword naturally in the product name, page titles and headings, and give searchers what they want in the first screen (a free tool, a gallery, a calculator) so they stay.

## Step 4. Design the page template
Write `template.md` with `{{column}}` placeholders. Every page has:
- A title and H1 that match the search (`{{entity}}` + the main keyword).
- A direct answer, or the thing they searched for, in the first screen.
- A unique-data block: numbers, lists, prices, examples or images that differ for every row. This is what makes the page worth indexing.
- A short section only this entity needs (local rules, setup steps, entity-specific pros and cons).
- Links to the hub page and to 3 to 5 sibling pages.
- A call to action that matches the intent.

## Step 5. Build the data sheet
Write `data.csv`: one row per page, one column per placeholder, plus `source_url`. Fill it from data the user owns, public data they may reuse, or research the agent can cite. Never fill gaps with invented facts.

## Step 6. Generate and gate
Run `scripts/build_pages.py data.csv template.md pages --min-words 300`.
- Rows with missing fields are skipped and listed.
- Pages under the word minimum are flagged THIN. Add unique data or drop them.
- Read 10 random pages. If two pages read the same apart from the entity name, the template needs more unique data.
Search engines treat mass-produced pages with little unique value as spam (Google calls this scaled content abuse). The gate exists to stay clear of that.

## Step 7. Launch
Write `launch.md` and work through it:
- A hub page per page type, linked from the home page. Every page linked from a hub.
- An XML sitemap with all pages, submitted in Google Search Console and Bing Webmaster Tools.
- Publish in batches (for example 20 to 50 pages a week) and watch the indexing report.
- First backlinks: product launch sites and directories, relevant resource pages, partners and integrations you list.
- Expect slow results: search traffic often takes about 3 months to show and grows after 6 to 9. Track impressions first, then clicks.

## Guardrails
- Every page carries unique, verified data. Skip a page before you invent facts.
- Do not copy competitor pages or republish content you have no right to.
- No keyword stuffing, doorway pages or hidden text.
- Keep autocomplete research light and slow.
