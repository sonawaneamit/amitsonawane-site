---
name: "code-ui-slop-check"
description: "Review AI-generated frontend or full-stack code and UI copy before merge: scan for type escapes, swallowed errors, leftover logs, unowned TODOs and oversized functions; run UI strings through a deletion ladder; check design-system hygiene (tokens, spacing, components, states); then turn repeated findings into lint rules and agent instructions. Use on any pull request written mostly by an AI agent."
---

# Code and UI slop check

## Goal
Merge AI-written code that a careful human would have written: honest types, visible errors, no debug leftovers, short UI text, and consistent design.

## Step 1. Scan
Run `scripts/code_slop_scan.py {{folder}}` on the changed folders. It flags type escapes, disabled lint rules, empty or swallow-all catch blocks, console.log, TODOs without an owner, commented-out code, very long functions, and UI strings worth a look. It reports; it does not fix.

## Step 2. Code review
Go through each finding plus the checks the script cannot do:

Types
- `as any`, `as unknown as T`, ts-ignore and non-null `!`: replace with a real type, a type guard or runtime validation at the boundary (API responses, form input, storage). If an assertion must stay, add a one-line comment saying why it is safe.
- Parameters typed `any`: give them a type.

Errors
- Empty catch or catch that returns null: handle it (show a message, retry, or rethrow with context). Silent failure is the most costly AI habit.
- Do not wrap everything in try/catch "just in case". Catch where you can act.

Leftovers and size
- Remove console.log, commented-out code and dead branches. TODOs need an owner or an issue link.
- Functions over about 80 lines: split by responsibility.
- Duplicate helpers: search for an existing util before keeping a new one.

Patterns agents overuse (check, do not ban blindly)
- `.filter(...).map(...)` chains over large lists inside render: fine for small lists; use one pass or memoize when lists are big.
- New dependencies for small tasks: prefer the standard library or what the project already uses.
- Defensive checks for values the type system already guarantees.
- Comments that repeat the code. Keep comments that explain why.

## Step 3. UI copy deletion ladder
List every visible string (headings, labels, buttons, helper text, empty states, errors, toasts). For each, go down the ladder and stop at the first step that works:
1. Delete it. Does the UI still make sense? Many helper texts and subheadings can go.
2. Replace it with the UI itself: a clear label, a default value, an icon with an accessible name.
3. Shorten it: cut minimizers ("simply", "just", "easily"), worry pre-emption ("Don't worry", "Please note"), politeness padding, and restatement of the heading.
4. Rewrite it: verb-first buttons that say the result ("Book 10:00"), errors that say what happened and what to do next, empty states that offer the next action.
Keep: legal text, safety warnings and anything that prevents an expensive mistake.

## Step 4. Design-system hygiene
- Colours, spacing, radius, font sizes come from tokens, not raw values.
- Use existing components before new ones. One button style per role.
- Spacing on a consistent scale; alignment on a grid.
- Every interactive element has hover, focus, disabled, loading and error states, and keyboard access.
- Text contrast meets WCAG AA (usually 4.5:1 for body text).
- No decoration added "to look designed": gradients, shadows, emoji in headings, placeholder illustrations.

## Step 5. Prevent repeats
For any finding seen in 3 or more places, add a guard:
- A lint rule (for example: disallow explicit any; require a description on ts-expect-error; no-console; no-empty catch blocks; restrict raw colour values in styles).
- A line in the agent's instruction file (AGENTS.md, CLAUDE.md or the tool's rules file), with one bad and one good example.

## Output
```
## Findings
| Severity | File:line | Issue | Fix |
## Copy
| Where | Before | After (or DELETE) |
## Design
- ...
## Guards added
- lint: ...
- agent rule: ...
```

## Guardrails
- Review, then change. Large refactors go in a separate PR.
- Do not change behaviour while cleaning; run the tests after each batch.
- Copy changes on legal, pricing or safety text need the owner's OK.
