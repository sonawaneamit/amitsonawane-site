---
name: "voice-matched-drafting"
description: "Build and run a voice-matched drafting system from a person's own writing: split samples into corpus and holdout, extract a voice profile, draft from raw inputs, judge drafts against held-out real writing with a separate model, revise at most 3 rounds, then measure how much the person edits before publishing and feed the edits back into the profile. Use for posts, newsletters, emails or scripts that must sound like one specific person."
---

# Voice-matched drafting loop

## Goal
Drafts that need fewer edits each month, measured, for one person's voice and one content type at a time.

## Folder layout
```
voice/
  corpus/      # 80% of past pieces, used to build the profile and as examples
  holdout/     # 20% of past pieces, never shown to the drafter; only to the judge
  inputs/      # raw material for new pieces: notes, voice-note transcripts
  drafts/      # agent output, one file per piece and round
  final/       # what was published
  evals/       # judge reports, predictions, edit_log.csv
  voice.md     # the profile
```
Pick one content type to start (for example short posts). Mixing types blurs the profile.

## Step 1. Collect and split
Gather 30 or more pieces of one type that the person wrote with little or no AI help; more is better. Drop pieces edited heavily by someone else. Shuffle and move 20% to `holdout/`. The drafter never sees holdout.

## Step 2. Build voice.md
From `corpus/` only, write the profile with these sections:
- Measurables: median and spread of sentence length, piece length, paragraph length, share of questions, contractions, emoji, line breaks, use of lists.
- Openers: how pieces start, with 5 real examples quoted.
- Closers: how they end, with 5 real examples.
- Vocabulary: words and phrases used often; words never used (check by search, do not guess).
- Moves: recurring structures (story then lesson, claim then numbers, question then answer), with an example each.
- Stance: what the person argues for, against, and the tone toward the reader.
- Never: things that would be out of voice, with a reason.
Every rule needs a quoted example from the corpus. Rules without one get removed.

## Step 3. Draft
For each file in `inputs/`:
1. Find the 3 corpus pieces closest in topic or format.
2. Draft using voice.md and those 3 as examples. Facts come only from the input file. Mark gaps `[NEED: ...]`.
3. Save as `drafts/{{slug}}-r1.md`.

## Step 4. Judge and revise (max 3 rounds)
Use a different model, or at least a fresh session, as judge. Give it voice.md, the draft and 3 holdout pieces. It returns:
- Voice match 1-10, with the 3 lines that sound least like the person and why.
- Facts check: anything in the draft not in the input.
- Generic AI tells (see the writing-cleanup-pass skill).
Revise from the judge notes. Stop at a score of 8 or more, or after round 3. More rounds usually polish toward generic text.

## Step 5. Predict, then edit
Before the person edits, the agent writes `evals/{{slug}}-prediction.md`: the edits it expects (lines to cut, words to change, the opener to rewrite). Do not show it to the person. The person edits and saves to `final/`.

## Step 6. Measure and learn
1. Run `scripts/edit_rate.py drafts/{{slug}}-rN.md final/{{slug}}.md --type {{type}} --version {{voice.md version}}`. It logs the rate to `edit_log.csv`.
2. Compare the prediction with the real edits. Hits mean the agent knows a weakness; turn them into draft rules. Misses are new information.
3. Classify each edit: cut (too long), voice (wrong word or tone), fact (wrong or missing), structure (order, opener, ending), taste (no clear reason).
4. When the same class of edit happens in 3 or more pieces, add or change a rule in voice.md, bump its version, and note it in a changelog at the bottom.
5. Every month, move the best new finals into corpus, keep holdout fixed, and review the trend.

## Targets
Track the median edit rate per content type and voice.md version. A falling median means the loop works. Starting point: many people see high rates (40%+) on week one; aim for a steady fall rather than a fixed number.

## Guardrails
- Only the person's own writing goes in the corpus. Do not clone someone else's voice.
- Facts only from inputs. Never invent stories, numbers, clients or quotes.
- The person reviews and edits everything before it is published under their name.
- Keep holdout out of the drafter's context, or the judge score means nothing.
