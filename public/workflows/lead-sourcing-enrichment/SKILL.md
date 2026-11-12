---
name: "lead-sourcing-enrichment"
description: "Build a B2B lead list: write an ideal customer profile with hard filters, pull companies from public sources (directories, maps listings, job posts, association member lists, review sites, data providers), find the right role and a work contact, add a dated buying signal and a source URL per row, then dedupe, check email domains and score against the ICP. Use before any cold outreach, partnership push or account-based campaign."
---

# Lead sourcing and enrichment

## Goal
A list small enough to personalise and accurate enough to trust. Every row answers: why this company, why this person, why now, and where did we learn it.

## Step 1. Write the ICP
From the best current customers, write `icp.md`:
- Firmographics: industry, size (staff or locations), region, business model.
- Buyer: the role that feels the problem and the role that pays (often the same in small businesses).
- Must-haves: things that must be true for the product to work (for example "takes bookings by phone today").
- Disqualifiers: too big, wrong model, already a customer, competitor, regulated in a way you cannot serve.
- Signals: events that make now a good time (hiring, new location, bad reviews about the problem, a post asking for a tool, a tech change, funding, seasonal peak).
Then convert to `icp.json` rules for the scoring script (see templates).

## Step 2. Pick sources
Choose 2 to 4 where these companies show up with the data you need. Public options that usually work:
- Maps and local listings (category + city searches) for local businesses.
- Industry directories and association member lists.
- Job boards: companies hiring for the role your product helps.
- Review sites and app marketplaces: businesses listed under a category, or reviews of competing tools.
- Public company websites: team, contact and careers pages.
- Government or registry data where it is open (business registries, licence lists).
- A paid data provider or enrichment tool, if you already have one.
Check each site's terms. Prefer official exports and APIs. Go slowly and do not bypass logins or blocks.

## Step 3. Pull accounts
For each company: name, domain, size estimate, location, category, `source_url`, `found_on` date. Stop at about 2x your target count; filtering removes many.

## Step 4. Find people
For each account, find the buyer role from the company site, a public professional profile or the provider. Record name, title and a work email or the company's contact route. If no work email is public, use the contact form or phone route and note it. Do not guess personal emails.

## Step 5. Add signals
For each row, write a one-line `signal` with a date and a source link, for example "Posted on 3 Nov asking for booking software (link)". Rows with no signal stay on the list but score lower.

## Step 6. Clean and score
1. `scripts/lead_tools.py dedupe leads.csv` merges repeats by email or domain + name.
2. `scripts/lead_tools.py mx leads_dedupe.csv` flags email domains with no mail servers (dead or mistyped). It does not prove the mailbox exists; use a verification service before sending at volume.
3. `scripts/lead_tools.py score leads_dedupe.csv icp.json` adds `icp_score`, `icp_tier`, `icp_matched` and sorts high to low.
4. Read the top 20 and bottom 20 by hand. If the order looks wrong, fix the rules, not the rows.
5. Flag free-mail addresses (gmail and similar) as "personal: contact via business channel" unless the business itself uses that address publicly.

## Step 7. Hand off
Send tier A to the outreach workflow with the signal as the opener's reason. Keep tier B for a later round. Drop tier C.

## Output columns
`company, domain, name, title, email, contact_route, employees, industry, country, signal, signal_date, source_url, found_on, icp_score, icp_tier, notes`

## Guardrails
- Business contacts only, for a business purpose. Personal data stays minimal: name, role, work contact, public signal.
- Keep `source_url` for every row so you can show where data came from (GDPR and similar laws give people a right to ask).
- Follow site terms and robots rules; no login bypass, no captcha solving, no scraping private groups.
- Delete rows that opt out, and keep a suppression list so they never come back.
