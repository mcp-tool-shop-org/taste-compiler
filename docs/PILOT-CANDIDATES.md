# External Alpha — Pilot Candidate Shortlist

## Selection Criteria

| Requirement | Why |
|-------------|-----|
| React/TSX codebase | Current adapter coverage |
| Clear product identity | Taste needs taste to enforce |
| User-facing UI | Checks visual + interaction patterns |
| Active development | Need realistic feature tasks |
| Maintainer access | Someone must judge catches |

## Candidate Archetypes

We need a mix to prove the tool generalizes beyond our internal repos:

| Archetype | Internal proof | External gap |
|-----------|---------------|--------------|
| Creative / canvas-first | GlyphStudio, World Forge | Need external creative tool |
| Operational / utility | CommandUI | Need external utility app |
| Content / document | (none) | New archetype entirely |

---

## Tier 1 — Strong Fit (React/TSX, clear identity, active)

### Excalidraw

- **Repo:** [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw)
- **Archetype:** Creative / canvas-first
- **Identity:** Hand-drawn whiteboard aesthetic — extremely distinctive visual identity
- **Stack:** React + TypeScript
- **Why good:** Strongest product taste of any open-source drawing tool. The hand-drawn look IS the product. AI-generated UI that drifts toward polished enterprise styling would be immediately detectable. Forbidden patterns are obvious (no grids, no dashboards, no corporate chrome).
- **Risk:** Very large codebase. May need to scope to a single surface.

### Puck

- **Repo:** [puckeditor/puck](https://github.com/puckeditor/puck)
- **Archetype:** Creative / builder
- **Identity:** Modular page builder — clean, minimal, composable
- **Stack:** React + TypeScript
- **Why good:** Clear builder identity. Component grammar matters. Complexity budgets matter (builder UIs are naturally tempted toward feature sprawl).
- **Risk:** Builder tools have complex interaction patterns — good stress test for interaction laws.

### Notesnook

- **Repo:** [streetwriters/notesnook](https://github.com/streetwriters/notesnook)
- **Archetype:** Content / document
- **Identity:** Privacy-first note-taking — calm, focused, not feature-heavy
- **Stack:** React + TypeScript (cross-platform)
- **Why good:** Strong anti-enterprise identity. "Calm not corporate" principles map directly. Copy rules relevant (privacy-first language). Budget discipline matters (note apps bloat easily).
- **Risk:** Cross-platform codebase may have platform-specific surfaces the adapter can't scan.

## Tier 2 — Good Fit (need verification)

### Novel

- **Repo:** novel.sh / steven-tey/novel
- **Archetype:** Content / editor
- **Identity:** Notion-style editor — minimal, block-based
- **Stack:** React + TypeScript + Tiptap
- **Why good:** Small, focused product. Very clear identity. Easy to author a compact taste pack.
- **Risk:** Small surface area — may not produce enough violations to be interesting.

### ReacType

- **Repo:** [open-source-labs/ReacType](https://github.com/open-source-labs/ReacType)
- **Archetype:** Operational / prototyping
- **Identity:** Visual React prototyping tool
- **Stack:** React + TypeScript + Electron
- **Why good:** Prototyping tools have clear workflow invariants. Good for golden flow testing.
- **Risk:** Maintainer activity unclear.

---

## Recommended Pilot Set (3 repos)

| Slot | Candidate | Archetype | Why |
|------|-----------|-----------|-----|
| 1 | **Excalidraw** | Creative | Strongest visual identity. If taste enforcement works here, it works anywhere. |
| 2 | **Notesnook** | Content | Privacy-first identity + calm aesthetic. New archetype not proven internally. |
| 3 | **Puck** | Builder | Component grammar + budget discipline + interaction laws all heavily stressed. |

**Fallback:** Novel (if Puck is too complex), ReacType (if Notesnook is too cross-platform)

---

## Next Steps

1. Verify repos are actively maintained (check commit recency)
2. Verify React/TSX component surfaces are scannable by current adapters
3. Open pilot-intake issues or reach out to maintainers
4. Do NOT start authoring packs until a maintainer confirms interest
