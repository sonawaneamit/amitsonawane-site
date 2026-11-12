---
name: "copy-landing-stress-test"
description: "Stress-test landing page, ad or email copy before spending traffic on it: measure processing fluency (readability, sentence length, jargon), run three adversarial buyer personas, an objection gauntlet, a specificity audit and a friction audit across cognitive, emotional, UX and trust friction; score against a rubric; rewrite and repeat until the page passes the threshold. Use before launch, before paid traffic, or when conversion is low and traffic is fine."
---

# Copy and landing page stress test

## Goal
Find what makes a reader hesitate or leave, fix it, and prove the fix with a score before real traffic does.

## Step 1. Fluency check
Run `scripts/readability.py page.md` on the page text. Easy-to-read copy usually feels more believable as well as easier. Targets for most consumer and small-business pages: Flesch reading ease 60 or above, average sentence under about 15 words, no paragraph over 4 sentences, no jargon flags. Technical buyers can take denser copy; keep sentences short anyway.

## Step 2. 5-second test
Show only the first screen (headline, subhead, main visual, button). Ask a fresh model session, with no other context, to answer: What is this? Who is it for? What should I do next? Why this over doing nothing? Any wrong or vague answer is a top fix.

## Step 3. Three adversarial personas
Build three personas from the target customer and real customer words:
1. The skeptic: has been burned by similar products; looks for catches and missing proof.
2. The busy one: skims on a phone in 20 seconds; leaves at the first confusion.
3. The comparer: has two alternatives open (a competitor and doing it by hand); looks for reasons to pick one.
Each reads the full page in character and returns: where they hesitated, what they did not believe, what was missing, and whether they would take the action (yes, no, maybe) with a reason.

## Step 4. Objection gauntlet
List the 10 most likely objections (price, time to set up, switching cost, trust, fit, "my clients won't use it", risk). Use customer words if you have them. For each: is it answered on the page, where, and how well (0 none, 1 weak, 2 strong)? Unanswered top objections are top fixes.

## Step 5. Specificity audit
Highlight every claim. Mark each: specific (number, time, named mechanism, example) or vague ("save time", "easy", "powerful"). Rewrite vague claims with proof you hold. If no proof exists, cut the claim or make it smaller.

## Step 6. Friction audit
- Cognitive: too many choices, unclear next step, jargon, long blocks, unclear price.
- Emotional: risk with no reversal (guarantee, free trial, cancel anytime), fear of looking foolish, effort to switch.
- UX: slow load, form fields, mobile layout, button below the fold, pop-ups.
- Trust: no real faces or names (with consent), no reviews, no contact details, stock photos, mismatched claims.
Each item gets severity (high, medium, low) and a fix.

## Step 7. Score, rewrite, repeat
Score with the rubric. Write the ranked fix list (highest impact first) and a rewrite of the page copy. Rerun steps 1 to 6 on the rewrite with fresh sessions. Stop when the score reaches the threshold (75 is a good default) or after 3 rounds. Report before/after.

## Guardrails
- Use only proof the business holds. No invented numbers, reviews, logos, or testimonials.
- Personas are simulations. They find likely problems; real visitor data and A/B tests decide (see creative-thumbnail-testing).
- No dark patterns: fake scarcity, fake countdowns, hidden costs, pre-checked add-ons, confirmshaming.
