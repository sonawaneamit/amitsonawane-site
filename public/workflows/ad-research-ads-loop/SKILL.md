---
name: "ad-research-ads-loop"
description: "Research competitor and category ads in public ad libraries (long-running ads as a proxy for what works), extract hooks, angles, formats and offers into an angle bank, write original creative briefs, then run a daily health check on ad-level data with clear rules for pausing, refreshing fatigued creative and scaling winners, with human approval for every spend change. Use for paid social or search campaigns with a known target cost per acquisition."
---

# Ad research and daily ads loop

## Part A. Research (once, then monthly)

### A1. Search ad libraries
Use public libraries in a browser: Meta Ad Library, Google Ads Transparency Center, TikTok's Creative Center (top ads), LinkedIn Ad Library. They usually block scripted fetching, so use a browser session. Search each competitor and 3 to 5 category terms, in each target country.

### A2. Pick long runners
Advertisers usually stop ads that lose money, so ads that have run 60 days or more, or that appear in many variations, are a fair proxy for winners. Note the start date shown in the library. Save up to 30 ads: screenshot or description, brand, start date, format, landing page.

### A3. Build the angle bank
For each ad record:
- Hook: the first line or first 3 seconds, word for word for reference.
- Angle: the reason to buy it sells (save time, avoid loss, status, fear of missing out, simplicity, price, proof).
- Format: static, carousel, short video, creator-style video, testimonial, demo, comparison.
- Offer: trial, discount, guarantee, free tool, demo.
- Proof type: numbers, reviews, before/after, expert, demo.
Group into `angle_bank.md`: angles ranked by how many long runners use them, with 2 examples each.

### A4. Write briefs
For each of 3 to 5 angles, write a brief: audience, angle, hook options (3), format, proof you hold, offer, CTA, and compliance notes. Write original copy. Use the competitor's ad only to understand the angle, never its words, visuals, or people.

## Part B. Daily loop

### B1. Get yesterday's data
Ad-level, one row per ad per day, last 7 to 14 days: date, campaign, ad, spend, impressions, clicks, conversions, frequency. Export from the ads manager or pull through the platform's reporting API or an ads connector.

### B2. Run the check
`scripts/ads_health.py daily.csv --target-cpa {{target}}` writes `ads_brief.md` with four lists. Default rules (starting points, edit in the script):
- PAUSE: CPA above 2.5x target over the last 2 days, or spend above 3x target CPA with zero conversions.
- FATIGUE (refresh creative): frequency above 3.5, or CTR down 30% or more against the ad's first 3 days.
- SCALE: CPA at or below 0.7x target over 3 days with 3 or more conversions. Raise budget 20 to 30% at a time.
- WATCH: everything else with spend.

### B3. Add judgment
Before sending the brief, check: was there a tracking outage, a holiday, a landing page change, or a new campaign in learning? Note anything that makes the rules unreliable today.

### B4. Approve and act
Send the brief. Changes happen only after approval: pauses, budget moves and new ads. If the agent has write access to the ads account, it applies exactly the approved changes and logs them in `changes.log`.

### B5. Weekly
Feed fatigued ads' angles back into briefs; launch 2 to 4 new creatives a week on the best angles. Kill angles with no winner after a fair test.

## Guardrails
- No spend change, pause or new ad without approval. Read-only access is enough for the daily check.
- Original creative only. No competitor names, logos or trademarks in ads unless the platform's comparative advertising rules allow it.
- Claims need proof you hold. Follow platform ad policies (health, finance and personal attributes have extra rules).
- Use creators or real customers only with written consent and the platform's paid-partnership or disclosure labels.
