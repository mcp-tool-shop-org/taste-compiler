# Changelog

## [0.2.0] — 2026-04-02

Phase 2 pilot complete. Taste Compiler is proven on real repos.

### What is proven

**Token enforcement works at scale.** The CSS-var adapter catches raw color literals in both CSS files and inline CSSProperties objects. Inline-styles architectures are ~10x more vulnerable to token bypass than CSS-file architectures — the adapter catches both.

**Forbidden patterns prevent structural drift.** Dashboard creep, competing editing surfaces, and action-budget breaches were all prevented by pack constraints. These are product-shape catches, not cosmetic ones.

**Budgets prevent action sprawl.** The `maxPrimaryActionsPerScreen` budget caught 5-action panels that should have had 2, and dual-confirmation gates that competed with existing flows.

**Pack-guided generation outperforms unconstrained generation.** Across 3 repos and 3 paired trials, constrained runs (pack + plan-first + diff-first) produced 0 violations against 103 baseline violations. The pack changed the shape of the solutions, not just the styling.

### What is not yet proven

- **Copy rules** — not meaningfully stressed by the pilot task set
- **Interaction laws** — showed indirect effect, not yet cleanly attributable
- **Golden flows** — zero failures in 3 trials (tasks may not have hit golden-sensitive seams)
- **Pack vs workflow isolation** — tested as a bundle, not individually

### Added

- CSS-var token-bypass adapter (`packages/adapters-web/src/cssvar/`) — scans CSS files with `:root`-awareness and TSX/JSX for inline style color literals
- Forbidden pattern seeds in source schema (`forbiddenPatternSeeds` field with auto-derived detection hints)
- Flexible golden flow steps (string or `{route, purpose}` union)
- Baseline snapshot script (`scripts/baseline-snapshot.mjs`) for freezing historical violation debt
- Taste packs for 3 pilot repos: GlyphStudio, CommandUI, World Forge
- Trial artifacts: 3 paired trials with baseline/constrained outputs, manifests, and scored reports
- Pilot verdict document (`trials/PILOT-VERDICT.md`)

### Fixed

- Tailwind scanner no longer double-counts CSS files (CSS-only scanning moved to CSS-var adapter)
- Tailwind scanner skips CSS custom property definitions (`--` prefix)
- CLI `check` command sends status messages to stderr when `--format json`
- Compiler handles string | object union in golden flow steps

### Pilot results

| Repo | Baseline violations | Constrained | Catch type |
|------|-------------------|-------------|------------|
| GlyphStudio | 11 | 0 | Strong (dashboard + action creep + token bypass) |
| CommandUI | 7 | 0 | Moderate (token bypass + budget breach) |
| World Forge | 85 | 0 | Strong (inline-styles + dashboard + editing surface + budget) |

### Strongest truthful claim

Taste Compiler constrains AI-generated product work so it stays inside a product's visual system, identity boundaries, and complexity limits.

## [0.1.0] — 2026-04-01

Initial release. Compiler proof complete.

- 6 packages: core, compiler, check, goldens, adapters-web, cli
- 7 CLI commands: init, validate-source, compile, explain, check, diff, goldens verify
- 5 evaluators: token, grammar, copy, budget, forbidden pattern
- 5 acceptance gates passing (A-E)
- 166 tests
