---
name: "channel-test-cadence"
description: "Run growth channel tests on a fixed cadence: pick candidate channels, write a hypothesis with budget, time box and kill line, run one or two tests at a time, log cost including founder hours, and call each test double down, iterate or stop by cost per paying user. Includes a micro-creator test design (base pay plus performance bonus, disclosure) and an in-app review prompt after the value moment without review gating. Use for early products looking for the first channel that works."
---

# Channel test cadence

## Goal
Find one channel that brings paying users at a cost you can afford, then go deep on it before spreading out.

## Step 1. List channels
List 5 to 10 candidates: search (see weekly-seo-upkeep), communities (community-competitor-outreach), cold email (cold-outbound-at-volume), paid social, creators, partnerships, app stores, referrals, events, marketplaces. Score each 1 to 5 on: where your buyers already are, cost to test, speed to signal, and your skill at it. Test the top 2 first.

## Step 2. Write the test
One row in `test_log.csv` before you start:
- Hypothesis: "{{channel action}} will bring {{n}} paying users at under {{target}} each within {{weeks}}."
- Budget (money) and hours. Your hours are a cost; set an hourly value.
- Time box: 2 to 4 weeks is common.
- Kill line: the result that ends the test early.
- Tracking: a unique link, code or "how did you hear about us" option per test.

## Step 3. Run it
One or two tests at a time, so results do not mix. Do the channel properly: a half-hearted test teaches nothing. Write what you did each week in the learning column.

## Step 4. Log and call
Weekly, update the log and run `scripts/test_log.py test_log.csv --target-cpa {{target cost per paying user}} --hourly {{value}}`. Calls:
- DOUBLE DOWN: cost per paying user at or under target.
- ITERATE: under 2x target, or no paid users yet but 10+ sign-ups. Change one thing and rerun.
- STOP: worse than that at the end of the time box.
Write the decision and a one-line learning for every test, including stops.

## Step 5. Go deep
When a channel hits DOUBLE DOWN, give it most of your time for the next 1 to 3 months: more volume, better craft, systems. Add a new test only when it stops improving.

## Creator test design
- Pick a portfolio of 5 to 10 small creators (often 5k to 50k followers) whose audience matches the buyer, rather than one large creator.
- Pay a fixed base fee plus a bonus per sign-up or sale through their own code or link. Base pay respects their work; the bonus aligns incentives.
- Give a brief (the problem, the product, what not to say) and let them use their own voice.
- Require clear paid-partnership disclosure, using the platform's label where one exists. In the US the FTC's endorsement guides apply; many other countries have similar rules.
- Get written permission before reusing their content as ads.
- Log each creator as its own row so winners stand out.

## In-app review prompt (apps)
- Ask at a value moment: right after a successful action the user cares about (a completed booking, a finished task), never at launch or after an error.
- Use the platform's native prompt (Apple's StoreKit review request, Google Play's In-App Review API). These limit how often the prompt appears (Apple usually shows it at most 3 times in 365 days per user), so pick the moment carefully.
- No review gating: do not ask "Do you like the app?" first and send only happy users to the store. Both stores' policies forbid steering or filtering, and Google's guidance says not to ask questions before the prompt.
- Give everyone an easy in-app feedback link elsewhere in the app, not tied to the review prompt.

## Guardrails
- Approval before spending money or contacting creators.
- No fake reviews, incentivised reviews, or review gating.
- Disclosure on every paid creator post.
