---
name: "writing-cleanup-pass"
description: "Edit AI-sounding text so it reads like a specific human wrote it: diagnose word-level tells (inflated vocabulary, filler, hedges), structural tells (binary contrasts, reflexive triads, throat-clearing openers, chat leftovers, dash overuse, even rhythm) and framing tells (vague attributions, promotional inflation, actorless claims), then rewrite while preserving every fact and the intended tone. Use on any draft before it ships: posts, emails, landing pages, docs, reports."
---

# Writing cleanup pass

## Goal
Make a draft read like a specific person wrote it for a specific reader. Keep every fact. Change the shape, not the substance.

## Inputs
The draft, the audience and format, and optionally the intended tone and 2 to 3 samples of the person's own writing. If there is a sample, match its sentence length, vocabulary and level of formality.

## Step 0. Separate brief from artifact
Write 3 lines before editing: who reads it, what they must know or do after reading, and the facts that must survive (names, numbers, dates, offers, links). Never add facts. If the draft is vague because facts are missing, mark `[NEED: ...]` instead of inventing.

## Step 1. Scan
Run `scripts/slop_scan.py draft.md` if you can run Python, or read for the catalog below. Note the line of each hit.

## Pattern catalog
Strongest tells first. One sighting of a strong tell is enough to edit. Weak tells need company.

Strong (edit on sight):
1. Chat leftovers: "Great question", "I hope this helps", "Certainly!", "As an AI", "Let me know if you'd like...". Delete.
2. Throat-clearing openers: "Here's the thing", "Here's why", "The truth is", "Let me be clear", "It's worth noting". Delete and state the point.
3. Binary contrast formula: "It's not X, it's Y", "This isn't about X. It's about Y", "Not because X, but because Y", "stops being X and starts being Y". State Y directly.
4. Stock filler: "In today's fast-paced world", "In a world where", "At the end of the day", "When it comes to", "At its core". Delete.
5. Inflated words: delve, tapestry, testament, leverage, seamless, robust, elevate, unlock, harness, realm, landscape, navigate, pivotal, crucial, vibrant, foster, showcase, underscore, intricate, multifaceted, holistic, synergy, game-changer, cutting-edge, transformative, empower, streamline. Use the plain word or cut.
6. Fake suspense and emphasis: "Let that sink in", "Make no mistake", "Full stop.", "Plot twist:", "The best part?", "The result?". Delete.

Structural (edit when 2+ appear):
7. Reflexive triads: lists of three adjectives or clauses by default ("fast, simple, and powerful"). Keep the one that matters, or two.
8. Even rhythm: three or more sentences in a row of about the same length; or a run of very short sentences for drama. Mix long and short.
9. Dash overuse: em dashes used as all-purpose glue. Use a full stop, comma or colon.
10. Hedging seesaw: "While X, it's important to note Y". Pick a side; give a counterpoint in one sentence if needed.
11. Negative listing: "Not a X. Not a Y. A Z." State Z.
12. Formatting by rule: headings, bold and bullets on text short enough to read as two paragraphs. Remove them.

Framing (fix by naming the thing):
13. Vague attribution: "Experts say", "Studies show", "Many believe". Name the source, or cut the claim.
14. Actorless claims: "The data tells us", "A decision emerged", "The market rewards". Name who did what.
15. Promotional inflation: "revolutionary", "best-in-class", "world-class", "amazing". Replace with the specific fact that would make a reader think that.
16. Superficial -ing tails: "..., highlighting the importance of X", "..., ensuring Y". Cut, or make it a real sentence with evidence.
17. Telling instead of showing: "This is genuinely hard", "This matters because". Show the hard part or the consequence.
18. Writing for no one: "people", "users", "individuals" where "you" fits.

Filler adverbs (cut most): really, truly, genuinely, honestly, literally, simply, actually, deeply, fundamentally, essentially, basically, importantly.

## Step 2. Pass 1: cut
Delete strong tells, filler adverbs and hand-holding (summaries of what was just said, previews of what comes next). Do not rewrite yet.

## Step 3. Pass 2: rebuild
- Lead with the point. First sentence carries the main claim or the ask.
- Active voice with a human subject. Name the actor.
- Make every claim specific: a number, a time, a mechanism, an example. If the input has no specifics, keep the claim small and mark `[NEED: example]`.
- Vary rhythm: some long sentences, some short, never three alike in a row.
- Two items beat three when only two matter.
- Match the sample's register if given: contractions, sentence length, words the person uses.
- Keep formatting only where the reader scans (steps, specs, comparisons).

## Step 4. Check facts
List every name, number, date, quote and link in the output. Each must appear in the input. Remove or flag anything new.

## Step 5. Rescan and report
Rescan. Report: issues per 100 words before and after, and a change log (pattern, line, before, after). Read the result aloud once at a quick pace; rewrite any sentence you stumble on.

## Output
```
## Cleaned text
{{text}}

## Changes
| # | Pattern | Before | After |

## Scores
Before: {{issues per 100 words}}, rhythm stdev {{x}} | After: {{y}}, {{z}}
## Needs from you
- [NEED: ...]
```

## Guardrails
- Preserve information, not shape. Never invent facts, names, numbers, dates, quotes or sources.
- Keep the intended tone; a formal legal notice stays formal.
- The goal is clear, specific writing. Do not add typos, slang or errors to "sound human", and do not try to fool AI detectors.
- When the writer's own voice uses a flagged word on purpose, keep it.
