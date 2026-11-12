---
name: "community-competitor-outreach"
description: "Find and respond to high-intent public posts: people asking for a recommendation, comparing tools, or complaining about a competitor's product, in forums, communities, Q&A sites, app reviews and social posts. Score intent, draft helpful replies with disclosed affiliation, follow each community's rules, send one-to-one messages only to businesses or people who invited contact, and track conversations. Use for early customers, switchers from incumbents and community-led growth. Never astroturf."
---

# Community and competitor-switcher outreach

## Goal
Be the most useful answer in threads where people are already looking. Win trust in public; move to private only when invited.

## Step 1. Set queries
For each community, write three kinds of searches:
- Requests: "recommend {{category}}", "looking for {{category}}", "what do you use for {{job}}", "alternative to {{competitor}}".
- Comparisons: "{{competitor A}} vs {{competitor B}}", "{{competitor}} or", "switching from {{competitor}}".
- Complaints: "{{competitor}} {{known gap}}", "{{competitor}} support", "cancelled {{competitor}}", "{{competitor}} price increase".
Use the site's own search, a search engine with `site:` filters, public APIs where they exist (see the pain-point-mining skill for verified ones), and app store or review pages for competitor complaints.

## Step 2. Collect posts
Keep posts from the last 7 to 30 days that are still open (no accepted answer, thread not locked, person still active). Record: url, community, date, author type (business or individual, if clear), the exact quote, and what they need.

## Step 3. Score intent (1 to 5)
- 5: asking for a tool now, with requirements you meet.
- 4: comparing options, or about to switch.
- 3: complaining about a gap you fix, no ask.
- 2: general discussion of the problem.
- 1: venting, off-topic, or a gap you do not fix.
Work 4 and 5 daily. Batch 3 weekly. Skip 1 and 2.

## Step 4. Draft replies
Each reply:
1. Answers their actual question in the first lines, useful even if they never use your product. Include the honest options, competitors too when they fit better.
2. States your affiliation plainly if you mention your product: "I work on {{product}}, so I'm biased." Mention it once, only when it fits the stated requirements.
3. Has no link unless the community allows it and the person would need it.
4. Sounds like you; run the writing-cleanup-pass skill. No templates pasted across threads.
For competitor complaints: no attacks on the competitor. Acknowledge the issue, give a workaround if one exists, then mention your option with disclosure.

## Step 5. Approve and post
Show the queue with drafts. Post only after approval, from the person's own real account, following each community's rules on self-promotion (many allow it only in set threads or ratios). One account per person; no alternate accounts.

## Step 6. Follow up
- Reply to replies in public first.
- Send a private message only if the person asks, the platform allows it, and for B2B contacts, a business has a public contact route for that purpose. One message, opt-out offered, no sequence.
- Log every thread in `conversations.csv`: url, date, intent, reply posted, their response, next step, outcome.
- Weekly: which communities and query types lead to conversations; drop the rest.

## Guardrails (hard rules)
- Never post from fake or alternate accounts, never ask friends or staff to upvote or comment, never buy votes, reviews or comments, never pose as a neutral customer.
- Disclose affiliation every time you mention your product. In the US, the FTC's endorsement guides usually require clear disclosure of material connections; other places have similar rules.
- Follow each community's rules; when in doubt, ask the moderators.
- Do not scrape private or members-only groups. Do not message individuals who did not invite contact.
- Do not collect personal data beyond what you need to reply and track the thread.
