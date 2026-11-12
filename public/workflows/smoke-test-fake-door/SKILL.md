---
name: "smoke-test-fake-door"
description: "Run a fake-door or pre-sell smoke test for one or more product ideas: mockup, single landing page, waitlist or refundable deposit, daily short-form content, and a pass/kill decision against a line set before launch. Use after pain-point mining or whenever an idea needs proof of demand before building."
---

# Smoke test with a fake door and payment link

## Goal
Find out whether real people will act on a promise (sign up, or better, pay a refundable deposit) before anything is built. Compare up to 5 promises with the same traffic and let the numbers decide.

## What you produce
1. `test-plan.md` (before launch, never edited after)
2. `landing-page.md` per promise
3. `mockups.md` (image briefs or generated images)
4. `content-calendar.md` (14 daily short video scripts per promise)
5. `results.md` (daily log + final call)

## Inputs
Ask for anything missing in one message: promises (1 to 5), audience, price idea, traffic source and daily budget or posting capacity, the page tool the user prefers, and the payment tool they already have (any checkout or payment-link tool works).

## Step 1. Test plan
Write `test-plan.md` with, per promise:
- Promise (one line), audience, where traffic comes from, test length (7 to 21 days).
- Primary action: waitlist signup (weaker) or refundable deposit (stronger). Pick deposit when the price is under about $100 and the buyer is a consumer or a solo business.
- Pass line and kill line, set now. Starting points if the user has none:
  - Waitlist from cold traffic: pass at 5%+ of visitors, kill under 1%.
  - Deposit from cold traffic: pass at 1%+ of visitors or 10+ deposits, kill at 0 deposits after 300 visitors.
  - Short video: a video that clears its usual views by 3x is a hook signal, not a demand signal. Only page actions count as demand.
- Minimum sample before any call: 300 visitors per promise, or 14 days.
Lock the file. Results never change the lines.

## Step 2. Mockup
Brief 3 to 5 screens that show the outcome the promise names: the result screen first, then the one action that gets there. No settings pages, no logins. If you can generate images, make them; otherwise write briefs a designer or design tool can follow: screen name, what is on it, the one number or sentence that sells it. Mark mockups as previews on the page.

## Step 3. Landing page
One page per promise, in this order:
1. Headline: the promise in 10 words or fewer.
2. Subheadline: who it is for, the result, how fast or easy.
3. Mockup image.
4. 3 bullets, each built from a real customer quote (from pain-point mining if available).
5. Price or deposit offer stated plainly ("Reserve early access: $10 deposit, refunded in full if we do not launch by {{date}}").
6. One button. Same call to action at the bottom.
7. Short FAQ: when it launches, what happens to the deposit, how to get a refund.
Keep it under 300 words. No fake testimonials, user counts, logos or awards.

## Step 4. The door
- Waitlist: an email form. The thank-you page says the product is in development and gives a date for the next update.
- Deposit: a payment link for a fixed small amount. The page and checkout say it is a refundable pre-order or deposit. The thank-you page repeats the refund terms.
- Track: page visits, button clicks, form submits or payments, by promise and by traffic source (use UTM tags like `?utm_source=shortvideo&utm_campaign={{promise_id}}`).

## Step 5. Content calendar
For each promise, write 14 short video scripts (15 to 40 seconds), one per day:
- Same format every day so only the hook changes (for example: problem in the first 2 seconds, mockup demo, one line call to action "link in bio").
- Hooks come from customer quotes and pains. Write the first spoken line and the on-screen text.
- Mix: 6 problem hooks, 4 result hooks (mockup reveal), 2 behind-the-scenes "I'm building this, should I?", 2 answering a comment.
- One idea per video. Never claim the product exists if it does not; say "I'm building" or "early access".

## Step 6. Run and log
Every day write a row in `results.md`: date, promise, posts, views, profile/page visits, button clicks, signups, deposits, ad spend. Do not change the page during the first 7 days unless something is broken.

## Step 7. Call it
At the end, for each promise: conversion rate with its range (`scripts/smoke_test_calc.py`), and one call:
- PASS: the low end of the range is at or above the pass line. Next: email every signup or depositor, book 5 calls, start the build.
- KILL: the high end of the range is below the kill line. Next: refund deposits within 7 days, tell signups, move on.
- KEEP RUNNING: not enough data. Extend once by 7 days, then call it.
Also report which hook drove the most page visits, and what people said in comments and replies.

## Guardrails
- Be truthful. The page must say it is early access or a pre-order. No fake reviews, numbers, logos or "as seen on".
- Deposits are refundable, with a clear date. Refund everyone promptly if you do not build.
- Follow the rules of the payment tool you use for pre-orders.
- Only collect the data you need (an email, or a payment handled by the payment tool). Add a short privacy note.
- The lines in `test-plan.md` do not move after launch.
- Do not post from fake accounts or buy engagement.
