---
name: "pain-point-mining"
description: "Find and rank the problems a target audience already complains about in public, with verbatim quotes and source links, before anything gets built. Use when validating a niche, choosing between product ideas, or learning why customers leave competing products."
---

# Pain-point mining

## What you produce
1. `raw.jsonl`: every post, review and comment you collected, one per line.
2. `pain-points.md`: 15 to 30 pain points, scored and ranked, each with 2 verbatim quotes and their sources.
3. `promises.md`: a one-line promise for each of the top 2 pain points, ready for a smoke test.

## Inputs
Ask the user for anything missing, in one message, then start.
- niche: who the customer is, as specific as possible ("solo mobile dog groomers in the US").
- competitors: 3 to 5 products or services they use today, including spreadsheets or manual workarounds.
- communities: forums, subreddits or groups the user already knows (optional).
- market: country and language. Default: US, English.
- window: how far back to read. Default: last 12 months.

## Step 1. Pick sources
Pick 4 to 6 public places where the niche describes problems in their own words. Cover at least 3 of these types:
- Low-star reviews of competitors: app stores, software review sites, marketplace listings.
- Communities: subreddits, niche forums, public groups. Prefer large, active ones with posts in the last 30 days.
- Comments under the most viewed videos in the niche. Repeated asks ("what do you use for...", "I wish I could...") are demand people state for free.
- Q&A sites and tech forums when the niche is technical.
Write `sources.md`: link, type, why it fits, and how you will collect it.

## Step 2. Collect
Target 300 to 1,000 raw items. Use the first method that works for each source.

A. Public JSON endpoints, no login needed:
- App Store reviews (50 per page, pages 1 to 10, newest first). Find the app id first:
  `https://itunes.apple.com/search?term={{competitor}}&entity=software&limit=5` (use `trackId`)
  `https://itunes.apple.com/{{country}}/rss/customerreviews/page={{1-10}}/id={{trackId}}/sortby=mostrecent/json`
  Fields: `im:rating.label`, `title.label`, `content.label`, `updated.label`. Keep 1 to 3 stars.
- Hacker News comments (developer and B2B tools):
  `https://hn.algolia.com/api/v1/search?query={{phrase}}&tags=comment&hitsPerPage=100&page={{0-4}}`
  Add `&numericFilters=created_at_i%3E{{unix_time}}` to limit by date. Full thread: `https://hn.algolia.com/api/v1/items/{{id}}`.
- Stack Exchange sites:
  `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&q={{phrase}}&site={{site}}&pagesize=100&filter=withbody`
- If you can run Python, `scripts/collect.py` does the App Store and Hacker News pulls.

B. API with the user's own key:
- YouTube comments need a YouTube Data API key from the user:
  `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId={{id}}&maxResults=100&order=relevance&key={{API_KEY}}`
  Without a key, ask the user to paste the top 200 comments of the 3 to 5 most viewed videos.

C. A browser you control (sites with no open endpoint):
- Reddit: scripted `.json` and RSS access without a login was shut down or restricted in 2026. Read threads in a browser session the user has signed in to, only with their permission, or use the official Reddit API if they already have approved access. Otherwise use method D.
- Software review sites and Google Play: filter to 1 and 2 stars and the last 90 days, then copy role, date, rating and text. These sites usually block plain scripts.
- Forums and groups: open the busiest threads that match the pain and copy the post and top comments.

D. Paste method (any agent, no web access):
- Ask the user to paste threads, reviews or comments into files in a `pasted/` folder (or into the chat). The first line of each file is the source URL.

Save every item to `raw.jsonl` with: `source`, `url`, `date`, `stars` (if any), `text`. Remove usernames and anything that identifies a person. Stop at 1,000 items.

## Step 3. Extract
Read `raw.jsonl` in batches of about 50 items. For each item with a complaint, wish, workaround, price objection or switching story, write one row:
`pain` (short, customer words) | `type` (complaint, wish, workaround, price, switching) | `intensity cue` (the words that show how much it hurts) | `pay signal` (price, paying, switching, budget, "I'd pay") | `quote` (verbatim, 30 words max) | `source` (url or app + date).
Skip praise, spam and one-off support requests.

## Step 4. Cluster
Merge the rows into 15 to 30 pain points. Name each in customer language, 4 to 10 words. Frequency = number of distinct items that mention it. Keep the 2 strongest quotes from 2 different sources.

## Step 5. Score
Score each pain point 1 to 5 on four factors:
- F, frequency: share of all items that mention it. 1 = under 1%, 2 = 1-2%, 3 = 3-5%, 4 = 6-10%, 5 = over 10%.
- I, intensity: 1 = mild annoyance, 3 = repeated frustration or lost hours, 5 = lost money, lost clients, anger, or "I'm switching".
- W, willingness to pay: 1 = no money talk, 3 = compares prices or tools, 4 = already pays for a workaround or switched, 5 = says they would pay or asks for a paid fix.
- G, gap: 1 = an existing product solves it well, 3 = partly solved, 5 = nobody solves it and people use spreadsheets or manual hacks.
Score = 2F + I + 2W + G (max 30). 22 or more: test now. 16 to 21: watch. Under 16: drop.

## Step 6. Stress-test the top pain
Using only the collected evidence:
1. What does every successful product in this market understand that its customers never say out loud?
2. Which 3 assumptions is the market built on, and what would make each one wrong?
3. Write the 5 questions a skeptical investor would ask to kill a product built on the top pain, and answer each from the evidence. Rate each answer strong, weak or missing.

## Step 7. Write promises
For the top 2 pain points write 3 one-line promises each with this template, then pick the best one per pain:
`For {{who}} who {{situation}}, {{product type}} that {{result}}, so you never {{pain in their words}} again.`
Use words from the quotes. Under 25 words. No numbers you cannot back up.

## Output format: pain-points.md
```
# Pain points: {{niche}}
Read {{n}} items from {{k}} sources, {{date range}}.

| # | Pain point | F | I | W | G | Score | Quote 1 | Quote 2 | Sources |
|---|-----------|---|---|---|---|-------|---------|---------|---------|

## Top 2 and why
## 3 things that surprised you
## Stress test (questions, answers, evidence strength)
## What to test next
```

## Guardrails
- Quote verbatim. Never invent, merge or polish a quote. If you cannot find the source line, drop the quote.
- Every pain point needs at least 2 items from 2 different sources.
- Strip usernames, emails and anything that identifies a person.
- Follow each site's terms. No login bypass, no fake browser identity, no captcha solving. If a site blocks you, switch to method D.
- Frequency comes from your sample. Say how many items you read and do not present it as market size.
- This skill only reads. Do not post, reply, message or sign up anywhere.
