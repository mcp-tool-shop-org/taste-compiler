# Taste Compiler — Phase 2 Pilot Verdict

**Date:** 2026-04-02
**Pilot scope:** 3 repos × 1 paired trial each (baseline vs constrained)
**Result:** Qualified pass

---

## Promoted Truths

These findings are now proven by the pilot and should be treated as load-bearing facts for Phase 3 planning.

### PT-1: The pack changes what gets built, not just how violations are reported

The constrained runs produced structurally different solutions:

| Repo | Baseline shape | Constrained shape |
|------|---------------|-------------------|
| GlyphStudio | Dashboard + export launcher (2 actions, stat grid) | Read-only review surface (0 actions) |
| CommandUI | Guidance + acknowledge button (dual confirm) | Informational advisory (0 new actions) |
| World Forge | Full editing surface (5 mutations, stat row) | Read-only context inspector (0 mutations) |

This is not lint behavior. The pack steers product decisions.

### PT-2: Token bypass is the highest-volume early violation class

96 of 103 baseline violations were raw color literals. The CSS-var adapter is the workhorse checker.

Architecture vulnerability amplifies this: inline-style codebases (World Forge: 81 violations) drift ~10× harder than CSS-file codebases (CommandUI: 6, GlyphStudio: 9).

### PT-3: Forbidden patterns and budgets are the highest-value early violation class

Token checks generate volume. Forbidden patterns and budgets generate the catches that matter most:

- Dashboard creep prevented (GlyphStudio, World Forge)
- Action-budget breaches prevented (all 3)
- Competing editing surfaces prevented (World Forge)
- Dual-confirmation gate prevented (CommandUI)
- styles.ts bypass prevented (World Forge)

### PT-4: Pack-guided generation outperforms unconstrained generation

The constrained workflow (pack summary + plan-first + diff-first) produced zero violations across all 3 trials. The baseline workflow produced 103.

**Caveat:** The pilot tested a bundle (pack + plan-first + diff-first), not the pack in isolation. What is proven: the workflow works. Isolating the pack's individual contribution is a Phase 3 question, not a Phase 2 requirement.

### PT-5: Product identity preservation is real and measurable

The pack preserved:
- GlyphStudio's canvas-first, deterministic-editing identity (no dashboard, no export buttons)
- CommandUI's shell-first, terminal-central identity (no second confirmation, no new chrome)
- World Forge's spatial-first, canvas-serving identity (no editing in inspector, no stat tiles)

This is the core product proof.

---

## Open Hypotheses

These are not disproven — they are untested or insufficiently stressed by the current pilot set.

### OH-1: Copy rules deliver value (H3 — still open)

Copy violations were essentially absent in both baseline and constrained runs. The pilot tasks did not stress copy-sensitive surfaces (onboarding, error messages, empty states with personality). Needs tasks that tempt:
- Autonomy overclaiming ("I will...", "I've fixed...")
- Assistant persona in non-chat contexts
- Hedging language in deterministic outputs

### OH-2: Interaction laws have measurable standalone value (H3 — still open)

Interaction-law pressure showed indirect effects (preview/commit separation, read-only vs mutating behavior), but the current scoring does not cleanly attribute violations to interaction-law rules vs forbidden-pattern rules. Needs:
- Tasks that specifically tempt mode confusion (creative mode leaking into structured mode)
- Tasks where the interaction-law constraint is the only thing preventing drift

### OH-3: Goldens fire rarely but with high severity (H4 — inconclusive)

Zero golden failures in 3 trials. Could mean the pack prevented golden violations upstream, or the tasks did not hit golden-sensitive seams. Needs tasks that specifically tempt:
- Export-truth divergence (export produces different data than editor shows)
- Semantic/direct-mode blur (CommandUI)
- Preview/commit breakage (GlyphStudio)

### OH-4: The pack's value is additive beyond plan-first discipline alone

The pilot bundled pack + plan-first + diff-first. An unconstrained run with plan-first (but no pack) might still produce better results than pure baseline. The question: how much of the 103→0 improvement is the pack vs the workflow? Not urgent — the bundle works — but relevant for product positioning.

---

## Checker Refinements

Concrete improvements to make before Phase 3 trials.

### CR-1: Inline-style scanner weight

The CSS-var adapter catches inline styles in TSX, but 81 violations in a single file is noisy. Consider:
- Grouping violations by declaration site (a `ROLE_COLORS` constant with 6 raw hex values = 1 finding, not 6)
- Reporting "violation density" (violations per 100 lines) alongside raw count
- Distinguishing constant-map violations (structural) from inline-prop violations (per-instance)

### CR-2: styles.ts bypass detection

World Forge's `fp-styles-ts-raw` forbidden pattern caught the styles.ts bypass, but only as a human judgment in the trial report. The checker should detect:
- Components in `packages/editor/src/panels/` that import zero primitives from `styles.ts`
- CSSProperties objects that redefine patterns already exported from `styles.ts` (e.g., panel backgrounds, section headers)

This is a World Forge-specific adapter, not a generic checker feature.

### CR-3: Action-budget counting

Budget breaches were scored by human judgment. The checker could partially automate this:
- Count `onClick` handlers that call store mutation methods (not navigation/selection)
- Compare to `maxPrimaryActionsPerScreen` budget
- Flag when count exceeds budget

Partial automation — human review still needed for mutation vs navigation distinction.

### CR-4: Forbidden-pattern detection hints

The compiler already generates detection hints from forbidden-pattern seeds. Verify these hints produce actionable grep-level checks:
- `fp-dashboard-metrics`: detect grid/flex containers with 3+ stat-like children
- `fp-styles-ts-raw`: detect missing styles.ts imports (see CR-2)
- `fp-chat-overlay`: detect chat-bubble CSS patterns
- `fp-dead-ai-button`: detect buttons with AI-action labels and no handler wiring

These are heuristic, not precise — false positives are acceptable if flagged as "review suggested."

---

## Next-Trial Task Shapes

Tasks designed to stress the open hypotheses and untested rule classes.

### Copy-stress tasks (OH-1)

| Repo | Task | What to catch |
|------|------|--------------|
| CommandUI | Add error recovery surface for failed commands | Autonomy overclaiming ("I'll retry..."), assistant persona, hedging |
| GlyphStudio | Add onboarding tooltip sequence for new users | Chatbot framing, personality injection, feature overclaiming |

### Interaction-law tasks (OH-2)

| Repo | Task | What to catch |
|------|------|--------------|
| World Forge | Add zone template quick-apply (creative mode operation) | Settings-panel clutter leaking into creative flow, mode confusion |
| GlyphStudio | Add animation preview with edit controls | Preview/commit blur, mutation during preview |

### Golden-stress tasks (OH-3)

| Repo | Task | What to catch |
|------|------|--------------|
| World Forge | Add export preview diff (show what engine will receive) | Export-truth divergence, data loss in conversion |
| CommandUI | Add command history with re-execute | Semantic/direct-mode blur, terminal demotion |

### Architecture-vulnerability tasks

| Repo | Task | Why |
|------|------|-----|
| World Forge (inline styles) | Any new panel | Confirms inline-styles vulnerability is systematic, not task-specific |
| CommandUI (CSS files) | Any new panel | Confirms CSS-file architecture is naturally more resistant |

---

## Phase 3 Entry Criteria

Phase 2 is complete. Phase 3 (broader trial matrix) should begin when:

1. **CR-1 shipped** — inline-style scanner grouping, so World Forge violations don't inflate counts
2. **At least 2 copy-stress tasks run** — to resolve OH-1
3. **At least 1 golden-stress task run** — to resolve OH-3
4. **Taste Compiler v0.2.0 tagged** — with Phase 2 trial artifacts included in the repo

Phase 3 scope: 3 repos × 3 tasks each = 9 paired trials, covering all 6 artifact classes.

---

## Summary

| Question | Answer |
|----------|--------|
| Does the pack improve AI output? | **Yes** — 103 → 0 violations, structural shape changes |
| Is it just cosmetic? | **No** — prevents dashboard creep, action-budget breaches, competing surfaces |
| Which rule classes are proven? | Tokens, forbidden patterns, budgets |
| Which are still open? | Copy, interaction laws, goldens |
| Is the checker sufficient? | For token bypass, yes. For behavioral rules, needs refinement (CR-1 through CR-4) |
| What is the biggest risk? | Overclaiming. 96/103 violations are one class (token bypass). Behavioral catches are real but lower-volume. |
| Is Phase 2 done? | **Yes.** Qualified pass. The compiler works on real repos. |
