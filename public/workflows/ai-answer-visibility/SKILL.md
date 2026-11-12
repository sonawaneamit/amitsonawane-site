---
name: "ai-answer-visibility"
description: "Audit and improve how often AI assistants (chat assistants and AI search) mention and cite a brand for buyer questions in its category: build a question set, record mentions and cited sources, analyse which pages and page types get cited, check crawler access and machine-readable content, then ship site and off-site fixes and re-measure monthly. Use for GEO/AEO work or when traffic from AI assistants matters."
---

# AI-answer visibility

## Goal
Measure how often AI assistants mention and cite the brand when buyers ask about its category, find out what they cite instead, and close the gap.

## Inputs
Ask in one message for: brand, site URL, category in buyer words, 3 to 5 competitors, the assistants the user cares about and can access, and key pages (home, pricing, comparisons).

## Step 1. Question set
Write `questions.csv` with 30 to 60 questions in buyer words. Columns: `id, intent, question`.
Cover these intents (about equal numbers):
- best: "What is the best {{category}} for {{use case}}?"
- compare: "{{brand}} vs {{competitor}}", "{{competitor}} alternatives"
- problem: "How do I {{job the product does}}?" "How do I stop {{pain}}?"
- price: "How much does {{category}} cost?" "Is there a free {{category}}?"
- brand: "Is {{brand}} any good?" "What do people say about {{brand}}?"
Pull real wording from search autocomplete (`keyword_suggest.py` in the keyword-and-programmatic-pages workflow), community threads and support emails if available.

## Step 2. Ask the assistants
For each question in each assistant, with web search or browsing turned on, in a fresh chat with no memory of the brand:
- Record in `answers.csv`: `id, assistant, date, run, mentioned (y/n), position (1 = named first), sentiment (pos/neutral/neg), competitors named, cited URLs`.
- Save the full answer text to `answers/{{assistant}}/{{id}}.md`.
Ways to run it:
- By hand in each app (slow but exact).
- Through assistant APIs that can search the web and return cited URLs with each answer. Note which ones you used.
- If the agent can only use one assistant, run that one and say so in the report.
Answers vary between runs. Ask each question twice per assistant and count a mention if it appears in either run; note the variance.

## Step 3. Score
Per assistant and overall:
- Mention rate = questions where the brand is named / total.
- First-place rate = questions where the brand is named first / total.
- Citation rate = questions where a URL on the brand's domain is cited / total.
- Share of voice = brand mentions / all brand mentions (brand + competitors).
Break down by intent. Most brands do well on "brand" questions and badly on "best" and "compare".

## Step 4. Study the citations
From all cited URLs, build `citations.md`:
- Top 20 cited domains with counts, grouped: your site, competitor sites, review sites and directories, community threads, media and blogs, video, docs and wikis.
- Top cited page types: listicles ("best X for Y"), comparison pages, pricing pages, how-to guides, community threads, review pages, documentation.
- For the 10 most cited pages, open each and note what makes it easy to quote: a direct answer in the first 2 sentences, a table, a date, named criteria, prices, pros and cons, a clear author.
- Gap: for each question where a competitor is named and the brand is not, which cited page supports the competitor, and whether the brand is on that page.

## Step 5. Check the site
Run `scripts/ai_visibility_check.py {{site}} {{key page URLs}}` or check by hand:
- robots.txt: search and user-triggered AI crawlers allowed (for example OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, plus Googlebot and Bingbot). Training crawlers (for example GPTBot, ClaudeBot) and the Google-Extended token are a separate choice; check each vendor's crawler docs before you block or allow them.
- Key content is in the HTML without JavaScript (the script counts readable words).
- `/llms.txt` exists: an H1 with the site name, a short blockquote summary, then H2 sections with markdown links to the most useful pages (pricing, product overview, comparisons, docs, policies). It is a proposed standard. Publishing one is cheap; do not expect it alone to change answers.
- Clean markdown versions of key pages (for example `/pricing.md`) if the stack makes it easy.
- Structured data on key pages (Organization, Product or SoftwareApplication, FAQPage where real FAQs exist).
- The site is indexed in the major search engines; submit the sitemap in each engine's webmaster tools. Several AI assistants search a web index before answering.

## Step 6. Fix list
Write `fix-list.md`, ranked by questions affected.
On the site:
- One answer-first page per high-value question cluster: the answer in the first 2 sentences, then a comparison table, criteria, prices, a date and an author.
- Honest comparison and alternatives pages for each main competitor (state where the competitor is better).
- Public pricing with plan limits in text, not only in images.
- Fresh dates and facts on pages assistants already cite.
Off the site (the cited sources from step 4):
- Get listed accurately on the review sites and directories that get cited. Ask real customers for reviews.
- Contribute useful, disclosed answers in community threads that get cited (see the community-and-video-search workflow).
- Send the authors of cited listicles facts they can verify.
Then rerun the same question set monthly and track the scores.

## Output: fix-list.md
```
# AI-answer visibility: {{brand}}, {{date}}
Mention rate {{x}}% | First-place {{y}}% | Citation rate {{z}}% | Share of voice {{s}}%

| # | Fix | Type (site/off-site) | Questions affected | Effort (S/M/L) | Owner | Due |
```

## Guardrails
- Record what the assistants said. Never edit answers to look better.
- No fake reviews, fake community accounts or planted answers. Disclose affiliation in any community post.
- Do not hide text for crawlers or show crawlers different content than people see.
- AI answers change often. Report dates, run counts and variance.
