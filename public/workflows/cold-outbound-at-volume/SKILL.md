---
name: "cold-outbound-at-volume"
description: "Plan, set up and run B2B cold email safely: size sending capacity, register separate lookalike domains, set SPF, DKIM, DMARC and MX, warm inboxes, write short signal-led sequences with one-click unsubscribe and a postal address, send at conservative per-inbox caps, and review reply, bounce and complaint rates weekly. Includes CAN-SPAM, GDPR/ePrivacy and mailbox-provider bulk-sender rules. Use with a lead list that has a reason to contact each person."
---

# Cold outbound that stays out of spam

## Goal
Real replies from the right people without hurting the main domain's reputation or breaking the law.

## Step 1. Plan capacity
Run `scripts/outbound_check.py plan --per-day {{n}} --cap 30`. Keep per-inbox caps low (often 20 to 50 new emails a day per inbox) and 2 to 3 inboxes per domain. Volume comes from more inboxes, not higher caps.

## Step 2. Set up sending domains
- Never send cold email from the main company domain. Register separate domains that are clearly related (for example `get{{brand}}.com`, `{{brand}}hq.com`) and redirect them to the real website.
- For each domain: MX (so replies arrive), SPF (one record only), DKIM from the sending provider, DMARC (start with `p=none` and a report address, then tighten).
- Check with `scripts/outbound_check.py dns domain1.com domain2.com --selectors {{provider selector}}`. Fix anything marked MISSING.
- Real-looking inboxes: a real person's name, a photo, a signature, the postal address.

## Step 3. Warm up
Give each new inbox about 2 to 4 weeks: start at 5 to 10 emails a day, add a few per day, and include normal back-and-forth mail. Most sending tools have a warmup feature. Do not launch a campaign on day one.

## Step 4. Write the sequence
Rules for every email:
- Under about 90 words. Plain text. No images, no attachments, at most one link (none in email 1 is safer).
- First line: the signal and why it made you write ("Saw you are hiring a second groomer").
- One problem, one offer, one easy ask (a yes/no question beats a calendar link).
- Subject: 2 to 5 lower-case words that look like a normal email. Never deceptive ("Re:" or "Fwd:" on a first email is deceptive).
- Footer: who you are, the business postal address, and a one-click unsubscribe link.

Sequence: email 1 (day 0), email 2 as a reply in the same thread with one new piece of value (day 3), email 3 a short close-the-loop (day 7). Stop on any reply.

Use the writing-cleanup-pass skill on all templates. Personalised first lines come from the `signal` column; if a row has no signal, use a segment-level reason, not invented flattery.

## Step 5. Launch small
Send to one segment of 50 to 100 tier A leads. Wait 7 days. Read every reply. Fix the offer or copy before scaling.

## Step 6. Weekly review
Pull per-domain and per-inbox numbers and fill the scorecard:
- Bounce rate: stop the inbox above about 3%; clean the list (verify mailboxes).
- Spam complaints: keep well under 0.1%; Gmail's bulk sender rules require staying under 0.3%. Stop the domain if it rises.
- Reply rate and positive reply rate per segment and per email version.
- Unsubscribes processed and added to the suppression list.
Change one thing per week (segment, offer, first line, subject) so results can be read.

## Compliance checklist
US (CAN-SPAM, applies to commercial email):
- Accurate From, Reply-To and routing; subject lines that match the content.
- The message is identifiable as an advertisement or solicitation where required.
- A valid physical postal address.
- A working opt-out; honour requests within 10 business days and never sell or share opted-out addresses.
EU and UK (GDPR plus ePrivacy rules):
- B2B email to work addresses is usually done under legitimate interest with a documented balancing test, but some countries require prior consent even for B2B email. Check the rules for each target country.
- Tell people where you got their data and how to object, in the first email or via a linked notice.
- Keep source and date for each contact; delete on request.
Mailbox providers (Gmail, Yahoo and others):
- SPF, DKIM and DMARC set; From domain aligned.
- One-click unsubscribe (List-Unsubscribe header with one-click support) for bulk senders, processed within about 2 days.
Everywhere: business contacts only, relevant offers only, no purchased lists of personal emails.

## Guardrails
- Ask for approval before the first send and before any volume increase.
- No deceptive subjects, fake threads, fake familiarity or invented personal details.
- Stop rules are hard stops, not suggestions.
- This is general information, not legal advice. Check local rules for each market.
