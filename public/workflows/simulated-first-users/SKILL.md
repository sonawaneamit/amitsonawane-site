---
name: "simulated-first-users"
description: "Simulate first-time users before launch: spin up 5 persona subagents (impatient, skeptic, mobile on slow network, non-native speaker, breaker) that each go from landing page to first success in a real browser, capture every point of confusion with screenshots, merge into one ranked list, fix, and rerun. Use before any launch, signup flow change, or onboarding redesign."
---

# Simulated first users

## Goal
Find the moments where new users get confused, stuck or annoyed between landing on the product and reaching first success, before real users hit them.

## Inputs
Ask for: start URL (staging is best), the definition of first success (one observable moment), test credentials or a test-mode payment card if signup needs them, and any personas to add. Never use real customer accounts or real payment cards.

## Step 1. Define first success
Write it as an observable event: "sees a booking confirmation with a deposit paid", "exports the first invoice as PDF". Every persona stops when it reaches this or gives up.

## Step 2. Personas
Run 5 subagents in parallel if you can, otherwise one after another. Each follows only its own rules:
1. **The impatient one.** Skims. Clicks the first button that looks right. Gives up at the first error or after 3 seconds of waiting.
2. **The skeptic.** Reads pricing, terms and privacy before signing up. Stops if the price, what happens after the trial, or what data is collected is unclear.
3. **The mobile user.** 375 px wide screen, slow network (throttle to slow 3G if your browser tool allows). Uses only taps. Notes anything off-screen, tiny or slow.
4. **The non-native speaker.** Understands only what the interface literally says. Flags idioms, jargon and any step that assumes knowledge.
5. **The breaker.** Pastes junk and very long text into fields, uses emoji, hits back mid-flow, double-clicks submit, refreshes on payment, opens two tabs.
Add personas from the user's real audience if given (for example "a 60-year-old owner who has never used a booking app").

## Step 3. Run
Each persona, in a real browser:
- Starts at the start URL with a fresh session.
- Thinks out loud in one line per step: what it sees, what it expects, what it does.
- Takes a screenshot at every moment of confusion, error, wait over 3 seconds, or doubt, and writes: step, what happened, what it expected, severity (1 = annoyed, 2 = slowed down, 3 = would quit).
- Stops at first success or when its rules say it quits.
Save each run to `runs/{{persona}}.md` with the screenshots.

## Step 4. Merge and rank
Merge duplicates across personas into `friction.md`:
`| # | Issue | Where (URL / step) | Personas hit (n/5) | Worst severity | Screenshot | Suggested fix |`
Rank by personas hit x worst severity. Separate: bugs, copy and clarity, layout and mobile, speed, trust (pricing, data, refunds).
Also report: how many of 5 reached first success, and the median steps and time it took.

## Step 5. Fix plan
For each issue write the smallest fix that removes it. Prefer: delete a step, rewrite a label, show the error next to the field, make the button say what happens next. If you have code access and permission, apply fixes in one pass on a branch and list the changes. Otherwise hand `fix-plan.md` to the user.

## Step 6. Rerun
Run the same 5 personas again with fresh sessions. Report: issues fixed, issues remaining, new issues, success count before vs after.

## Guardrails
- Test only on products the user owns or has permission to test, preferably staging.
- Use test-mode payments and disposable inboxes. Never submit real card data.
- The breaker stays within normal user actions in the browser. No load testing, no security attacks, no scanning.
- Simulated users find usability problems. They do not prove demand or replace talking to real users. Say so in the report.
