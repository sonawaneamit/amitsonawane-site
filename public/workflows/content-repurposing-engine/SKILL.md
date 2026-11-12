---
name: "content-repurposing-engine"
description: "Run a content system that grows one core idea into a month of posts: mine the person's own top posts for patterns, capture raw ideas from voice notes, expand each pillar into angles and formats (short posts, threads, carousels, short video scripts, newsletter), schedule a 30-day calendar, draft in the person's voice, and review performance monthly. Use for founders and small teams who post on social or send a newsletter."
---

# Content repurposing engine

## Goal
Post often without starting from a blank page, using what already works for this account.

## Step 1. Mine your own patterns
Export 30 or more past posts with text and engagement numbers (most platforms and scheduling tools offer an export or analytics CSV). Run `scripts/post_patterns.py posts.csv`. It compares the top 10% with the bottom half on length, line breaks, hook length, numbers in the hook, lists, links, a question at the end, emoji and format, and writes `top_posts.md`.
Then write `patterns.md`: 5 to 8 patterns, each with 2 real examples from top_posts.md. Patterns from a few posts are guesses; mark them "test".
You may also study public posts by others in your niche for structure (hook shapes, formats). Copy structure only, never their words or stories.

## Step 2. Capture raw ideas
Keep a running `ideas/` folder. The richest source is voice notes: 2 to 5 minutes, talking through one thing you saw, did, or believe. Transcribe (any speech-to-text works). Tag each by pillar. Also add call notes, customer questions, support tickets and talk transcripts.

## Step 3. Snowball one pillar
Pick 3 to 4 pillars (topics you can talk about for a year). For one pillar, generate angles:
- How-to, mistake, story, contrarian take, numbers or results, checklist, tool list, before/after, question from a customer, myth vs fact, behind the scenes, prediction.
Each angle then becomes formats:
- Short post (main channel), thread or long post, carousel (6 to 10 slides), short video script (30 to 60 seconds), newsletter section.
Every claim must come from the ideas folder or the person's notes. Mark `[NEED: story/number]` where a real example is missing.

## Step 4. Build the calendar
`calendar.csv` columns: `date, channel, pillar, angle, format, hook, source_idea, status`. Rules:
- One main channel gets daily or near-daily posts; others get adapted versions, not copies.
- Rotate pillars; no pillar more than 2 days in a row.
- Mix formats each week; reuse the best performer's format more often.
- Leave 2 to 3 open slots a week for timely posts.

## Step 5. Draft and approve
Weekly, draft the next 7 days. Use the patterns, the voice profile, and the writing-cleanup-pass skill. For carousels, write slide-by-slide text (one idea per slide, under about 25 words, slide 1 is the hook, last slide is the takeaway or question), then make visuals with a design tool or template. For video, write the first 3 seconds as a hook line plus an on-screen text line, then beats with times.
Nothing is posted without the person's approval. If a scheduler or connector is available, load approved posts as drafts or scheduled posts only after approval.

## Step 6. Monthly review
Export the month's posts and rerun the script on all posts so far. Update `patterns.md`: keep patterns that held, drop ones that did not, add new tests. Report the top 5 posts and why, and the next month's pillar mix.

## Guardrails
- Facts, numbers and stories only from the person. No invented anecdotes, clients or results.
- Do not copy other creators' text, hooks word for word, images or videos.
- Label AI-generated images or video where the platform requires it.
- The person approves every post.
