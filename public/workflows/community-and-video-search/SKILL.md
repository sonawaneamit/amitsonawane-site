---
name: "community-and-video-search"
description: "Win buyer-research searches on third-party platforms: find community threads and group posts that already rank for 'best X' and 'X vs Y' searches, contribute useful disclosed answers, run a genuine community of your own, and make fair 'competitor honest review' and 'X vs Y' videos for competitors that advertise heavily. Includes ethics and platform-rule guardrails. Use when buyers in your category research on forums and video before buying."
---

# Ranking on community platforms and video review searches

## Goal
Show up with real help and clear disclosure in the third-party places that rank for buyer-research searches: community threads, public groups and review videos.

## Inputs
Ask for: category, product, competitors (mark the ones running ads), the communities and video platform where the user has real accounts, and their affiliation line.

## Step 1. Map buyer searches
Build the search list:
- "best {{category}}", "best {{category}} for {{use case}}", "{{category}} reddit", "{{category}} recommendations"
- "{{competitor}} review", "{{competitor}} honest review", "is {{competitor}} worth it", "{{competitor}} vs {{competitor 2}}", "{{competitor}} alternative"
Expand with `scripts/keyword_suggest.py "{{competitor}}" --mode reviews` and `--mode compare`.
For competitors with active ads, check public ad libraries for how long their ads have run. Many buyers who see an ad search for reviews before paying, so heavy advertisers create review searches.

## Step 2. Find what ranks
For each search, check the top 10 web results and the top 10 video results. Also search `best {{category}} site:{{community domain}}` for each community the user is on.
Record in `serp-map.csv`: `search, type (web/video), position, url, platform, posted, open for replies, last activity, you present (y/n), score`.

## Step 3. Pick targets
Score each target with the rubric. High: a thread in the top 5 for a buyer search that is open and active; a video search where the top results are old, short or one-sided. Skip: locked threads and communities that ban self-mention.
Read each community's rules before posting. Many require disclosure, limit self-promotion, or ban it.

## Step 4. Contribute to threads
For each target thread, draft `replies/{{thread-id}}.md`:
- Answer the question fully, as if the product did not exist: criteria to choose, options (competitors included) with honest pros and cons, what to pick for which situation.
- Disclose before mentioning the product: "{{affiliation line}}".
- Mention the product once, only where it fits a need someone stated. Links only if the community allows them.
- The user posts from their real account and replies to follow-up questions.
For a community of your own (a public group or forum about the problem, not the product): post useful threads titled the way people search ("Best {{category}} in {{year}}: what members use"), update them, invite real members, and let members answer.

## Step 5. Make review and comparison videos
For each competitor with heavy ads and weak video results:
- A fair review, 8 to 15 minutes, from real use (a real account and real tasks): what it does well, its 2 biggest limits with evidence on screen, who should pick it, then a short, disclosed note on what you built differently.
- "{{A}} vs {{B}}" videos for the most searched pairs.
- Titles in search words: "{{Competitor}} honest review ({{year}}): who it is for", "{{A}} vs {{B}} for {{use case}}". Disclosure in the video and in the description.
Write `video-plan.md`: search, competitor, timestamped outline, evidence to capture, disclosure line, call to action.

## Step 6. Track
Weekly in `tracker.csv`: url, search, position, views or upvotes, clicks (tagged links where allowed), signups. Update threads you own when facts change. Never edit or report other people's content to gain position.

## Guardrails
- One real person, real accounts. No second accounts, no replying to yourself, no bought or swapped votes, no planted questions. These break platform rules and get accounts banned.
- Always disclose affiliation before mentioning the product.
- Follow each community's rules on self-promotion and links. Ask moderators when unsure.
- Competitor reviews are fair, based on real use, and dated. No false claims.
- No indexing services or tricks to force rankings.
