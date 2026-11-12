---
name: "creative-thumbnail-testing"
description: "Test creative systematically: write a hypothesis, generate variants that change one variable (face, text, colour, framing, hook line, format), pretest them with small paid budgets or built-in platform split tests, size the test before looking, compare results with a proper significance check, and log learnings so the next round starts smarter. Covers thumbnails, short-form video hooks, ad creatives and landing page headlines."
---

# Creative and thumbnail testing

## Goal
Pick creative with evidence, and learn something reusable each round.

## Step 1. Write the hypothesis
"Variant {{x}} will beat the current {{asset}} on {{metric}} because {{reason}}." Pick one metric: CTR for thumbnails and ads, hook retention (share still watching at 3 seconds) for short video, conversion for headlines.

## Step 2. Generate variants
Change one variable per variant so the result tells you why:
- Thumbnails: face vs no face, expression, text (0, 2 or 4 words), text wording, background colour, close-up vs wide, object vs result.
- Short video: first line, first frame, on-screen text, opening action, length.
- Ads: hook line, visual, format (static, carousel, video), offer framing.
- Headlines: outcome vs feature, number vs none, question vs statement.
Make 4 to 8 variants. Use an image tool or a designer for visuals. Keep text readable at small sizes (most views are on phones). Check each variant at thumbnail size before testing.
Faces: use your own, or a person who gave written consent for this use. Do not use AI-made likenesses of real people without consent, and label AI images where the platform asks.

## Step 3. Size the test
Run `scripts/ab_test.py size --base {{baseline rate}} --lift {{smallest relative lift}}`. It returns impressions (or visitors) per variant. Do not look at results and stop early before reaching it; peeking makes false winners likely.

## Step 4. Pretest
Pick the cheapest method that reaches the size:
- Built-in platform tests: some video platforms let you test multiple thumbnails or titles on a live video, and email tools split subject lines. Use these where available.
- Small paid budgets: run each variant as an ad with the same audience, budget and placement; CTR on ads is a fair proxy for thumbnail and hook pull. Use the platform's split-test or experiment feature when it has one, so audiences do not overlap.
- Short-form video: post variants of the hook as separate posts only if the platform allows it and the content stands alone; judge on hook retention and completion, not likes. Repost the winning hook as the main version.

## Step 5. Compare
Run `scripts/ab_test.py compare A:{{impressions}}:{{clicks}} B:... C:...` with the current version first. With more than two variants, the script adjusts p-values for multiple comparisons. Call a winner only if it says "different". If it says "not proven yet", keep the current version or run longer.

## Step 6. Log and ship
Put the winner live. Add a line to `learnings.md`: the variable, the winner, the lift, the sample, the date. After 5 or more tests, look for patterns (for example: faces win on tutorials, not on lists) and use them as the starting point for the next round.

## Guardrails
- One variable per variant.
- No clickbait the content does not deliver; it hurts retention and trust.
- Consent and disclosure for any person shown, and creator work used as ads only with permission.
- Approval before spending on paid pretests.
