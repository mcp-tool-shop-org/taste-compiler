# Taste Compiler — External Alpha Pilot Brief

## What we're testing

Taste Compiler compiles product taste into enforceable constraints that preserve visual coherence, identity boundaries, and UX safety under AI-generated change.

We're looking for 3-5 open-source repos to pilot the tool and give honest feedback.

## What you get

- A compiled Taste Pack for your product (we help author it)
- Paired trial results showing how the pack affects AI-generated diffs
- A structured report of what the tool caught, missed, and got wrong

## What we need from you

- **30 minutes** to describe your product's identity, principles, and anti-patterns
- **2-3 real feature tasks** that you'd realistically ask an AI tool to generate
- **Review time** to judge whether the tool's catches are real or noise
- **Honest feedback** via the pilot scorecard

## Repo requirements

Your repo should have:

| Requirement | Why |
|-------------|-----|
| Clear product identity | The tool enforces taste — it needs taste to enforce |
| React/TSX components | Current adapters scan JSX/TSX, CSS variables, and copy blocks |
| User-facing UI | The tool checks visual and interaction patterns, not backend logic |
| Active development | We need realistic feature tasks, not archeological digs |
| A maintainer who can judge drift | Someone needs to say "that catch was real" or "that's noise" |

Preferred but not required:

- Existing tests (shows baseline discipline)
- Clear design language or style guide
- History of AI-assisted development
- Mix of creative and operational surfaces

## What the tool checks

| Class | What it catches |
|-------|----------------|
| Visual Tokens | Raw colors, off-scale spacing, unauthorized typography |
| Component Grammar | Banned components, composition violations |
| Interaction Laws | Destructive actions without confirmation, dead-end empty states |
| Copy Rules | Banned phrases, tone drift, unqualified AI claims |
| Complexity Budgets | Too many nav items, actions, or modal layers |
| Forbidden Patterns | Explicitly banned layouts, components, or imports |
| Golden Flows | Silent regressions on critical user paths |

## What we've proven so far

7 paired trials on 3 internal repos:
- 245 baseline violations → 0 constrained
- All 6 rule classes live-proven
- Token bypass is highest volume; forbidden patterns + interaction laws are highest value
- The pack changes what gets built, not just how violations are reported

## How the pilot works

1. **Intake** — You describe your product. We author a Taste Pack together (30 min).
2. **Baseline lock** — We snapshot your current violation debt so we only score new drift.
3. **Paired trials** — You pick 2-3 feature tasks. We run each baseline (no pack) vs constrained (with pack). You review both outputs.
4. **Scorecard** — You fill out a structured scorecard rating trust, value, noise, and pain.
5. **Debrief** — We discuss what worked, what didn't, and whether you'd keep using it.

Total time commitment: ~2 hours spread across 1-2 weeks.

## What we're NOT testing

- Whether you should use AI to generate code (you already are)
- Whether lint rules are useful (taste is not lint)
- Whether the tool replaces design review (it doesn't — it catches drift before review)

## Interested?

Open an issue on the repo with the "pilot-intake" label, or reach out directly.

We're looking for honest signal, not cheerful testimonials. Tell us where it breaks.
