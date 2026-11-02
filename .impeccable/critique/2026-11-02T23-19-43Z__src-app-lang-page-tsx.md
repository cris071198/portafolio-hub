---
target: homepage (Hero + Projects grid)
total_score: 21
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\HP\\OneDrive\\Escritorio\\company_etlions\\personal\\portafolio-hub\\src\\app\\[lang]\\page.tsx"
target_fingerprint: "sha256:3416f2ec16887457ee100f44fc53e01e91ace33efb4152ae41644f5f5840841e"
target_path: "C:\\Users\\HP\\OneDrive\\Escritorio\\company_etlions\\personal\\portafolio-hub\\src\\app\\[lang]\\page.tsx"
timestamp: 2026-11-02T23-19-43Z
slug: src-app-lang-page-tsx
---
Method: dual-agent (A: design-review sub-agent · B: detector/browser-evidence sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Theme/locale state is instant and visible; external links give no "opens new tab" cue and status badges don't say *when* planned work ships |
| 2 | Match Between System & Real World | 2 | "Fase 1 · Tamaño S" is internal roadmap jargon with no legend — meaningless to the stated audience (recruiters/interviewers) |
| 3 | User Control and Freedom | 3 | No traps; no "back to top" after a long single-column mobile scroll |
| 4 | Consistency and Standards | 3 | Card/chip/badge patterns are rigorous — but `--faint-foreground` is the one color token without a `.dark` value, breaking the project's own "fully adapts per theme" rule |
| 5 | Error Prevention | 4 | Nothing to input; external links correctly use `rel="noopener noreferrer"` |
| 6 | Recognition Rather Than Recall | 3 | Nothing hidden; theme toggle has an `aria-label` but no visible tooltip for sighted mouse users |
| 7 | Flexibility and Efficiency | n/a | Experience/portfolio surface — no power-user workflow to accelerate |
| 8 | Aesthetic and Minimalist Design | 3 | Clean typography and restraint, undercut by an unexplained ~200px gap after the hero CTA and a 9-card wall of visually identical placeholders diluting the one real signal |
| 9 | Error Recovery | n/a | Static page, no forms, no user-triggered error states |
| 10 | Help and Documentation | n/a | Experience/portfolio surface — nothing to document |
| **Total** | | **21/28** | **Good (75%)** |

## Design Specificity Verdict

**Mixed, and the split is the finding.** The copy is unmistakably authored for this product — the hero tagline states the hub's mechanism in one sentence, and project summaries are domain-specific and credible (payroll with CTS/gratificaciones, UBL 2.1 e-invoicing, geofenced attendance). No generic portfolio could reuse this text unchanged.

The visual system is a competent but interchangeable instance of current minimalist conventions (rounded bordered cards, neutral chip stack badges, Geist type) — defensible as deliberate restraint per DESIGN.md, but it means specificity currently lives entirely in the words, not the structure. More consequentially: **only 1 of the 10 cards (the hub itself) has a working link**; none of the 9 skill-proving case studies do yet. Visually, every "Planeado" card carries the exact same weight and confidence as that one real item — the thing meant to differentiate this hub (runnable proof) isn't visible, and nothing in the design signals that honestly.

**Deterministic scan**: Static CLI scan over `src/app/[lang]` and `src/components` — 0 findings (clean; static source has no computed styles/layout to flag). Live browser scan on the rendered `/es` page (light theme) — **5 findings**: 1 low-contrast (warning), 3 straggler/orphan-line (advisory), 1 overused-font (warning). This is not a contradiction — contrast and line-wrap only exist once the page is rendered and styled, which the static scan can't see.

**Visual evidence**: Both assessments captured and inspected screenshots independently; all 5 detector findings were corroborated against the rendered page (no false positives) — the "En progreso" badge is visibly washed-out amber-on-cream next to the crisper gray "Planeado" badges, and all three flagged descriptions do end on a short orphaned last line with visible slack space beneath. The detector's browser pass only ran against the light theme; dark mode was not independently re-scanned by the tool (see Run Notes).

## Overall Impression

The hero is the strongest five seconds of the page: a confident name, a concrete one-sentence thesis, a low-key CTA. Then the page runs into its core honesty problem — it presents a 10-item "finished index" when only one item is actually inspectable, with no visual language distinguishing "proof you can check right now" from "plan." The single biggest opportunity is making that distinction visible before anything else — contrast fixes and chip-wrapping are real but secondary to that.

## What's Working

1. **Hero copy** — states audience, mechanism, and domain scope in one sentence; concrete rather than generic, rare for a portfolio.
2. **Theme token architecture** — full semantic light/dark coverage, `useSyncExternalStore` instead of an effect-driven flash, blocking inline script against FOUC, and `prefers-reduced-motion` correctly disables (not just slows) the card entrance.
3. **Restrained status-color system** — neutral chip for "planned," accent color reserved only for states needing attention; avoids color-coding every status equally loud.

## Priority Issues

**[P1] Zero of the nine skill-proving projects are linked — the page can't yet do the job it exists for**
- **Why it matters**: PRODUCT.md's premise is "verify quickly that skills claimed on the CV are real." Today the only clickable item is the hub's own meta-repo — not one of the Spring Boot/Angular/Vue/NestJS/FastAPI/Flutter case studies has a repo or demo link. The page's actual task is currently undoable.
- **Fix**: Don't give unlinked "planned" cards the same full-weight treatment as finished work — visually demote them (reduced emphasis, or a visible shipped/in-progress divider) and replace the blank space where links would go with an explicit "not started — planned for Phase N" instead of silent emptiness that reads as broken.
- **Suggested command**: `$impeccable layout` (restructure around build status) or `$impeccable clarify` (make the "not yet" state explicit).

**[P1] Status badge text fails WCAG AA contrast — measured, not estimated**
- **Why it matters**: The "En progreso" pill (`#e17100` on `#faf0e1`, light theme) measures **2.8:1** against a 4.5:1 requirement, confirmed both by the detector and visually (washed-out amber on cream, next to crisper gray "Planeado" badges on the same grid). This is the single most-featured accent color on the page's one real status.
- **Fix**: Darken the text or deepen the pill background so the pair clears 4.5:1; re-verify in both themes (the browser scan only covered light mode).
- **Suggested command**: `$impeccable harden`.

**[P2] Three card descriptions end on an orphaned last line ("portafolio.", "CTS.", "interfaz.")**
- **Why it matters**: Detector-flagged and visually confirmed — each leaves a short fragment alone on its final line with slack space beneath, a small but real typographic sloppiness across a third of the visible cards.
- **Fix**: Adjust copy length or `max-width`/line-breaking so summaries resolve cleanly, or accept a slightly shorter line-count target when writing summaries.
- **Suggested command**: `$impeccable typeset`.

**[P2] Internal roadmap jargon ("Fase 1 · Tamaño S") on every card, with no legend anywhere**
- **Why it matters**: This is the one metadata item given prime real estate in every card footer, and it's written for the author's own planning system, not a recruiter. Pure extraneous cognitive load with no payoff for the actual reader.
- **Fix**: Replace with recruiter-relevant info (expected timeframe, or the primary skill proven) or add a one-line legend near the section heading.
- **Suggested command**: `$impeccable clarify`.

**[P2] Stack-chip rows exceed the ≤4-items-per-group chunking guideline on larger cards**
- **Why it matters**: Motor de planillas (6 chips), Facturación electrónica (5), Monitor de eventos de red (5) all force a two-row scan per card, slowing the exact "skim many projects fast" behavior this page is optimized for.
- **Fix**: Cap visible chips at 4 with a "+2" affordance, or lead with the 3-4 chips most relevant to the claimed CV skill.
- **Suggested command**: `$impeccable distill`.

## Cognitive Load

3 of 8 checklist items fail → **moderate load, address soon**:
- Chunking fails (5-6 stack chips in one row on several cards)
- Visual hierarchy fails (the one linkable card reads identically to the 9 placeholders)
- Progressive disclosure fails (full detail shown identically regardless of whether a project is real or not-yet-started)

## Emotional Journey

Strong opening (hero) → an unexplained ~200px dead gap before "Proyectos" (visually confirmed in both screenshots) that reads as an unfinished section rather than breathing room → a long flat stretch of 8 consecutive identical gray "Planeado" badges with no new actionable signal → an anticlimactic end on the same flat note, with no reassurance, timeline, or secondary CTA (contact/CV/LinkedIn — confirmed in PRODUCT.md as intentionally not built yet, but the page doesn't currently say so, it just stops).

## Persona Red Flags

**Jordan (first-time visitor — closest proxy for the recruiter audience)**: Hero lands well; hits the dead gap right after clicking the CTA and may read the page as stalled; meets undefined "Fase 1 · Tamaño S" jargon on the very first card; by card 4-5 with no link and no "when," has received no new actionable signal — high abandonment risk before card 10.

**Riley (stress tester)**: The footer meta row renders identically whether a link exists or not — on 9/10 cards the right side is simply blank with no ghost text or disabled state, reading as a broken feature rather than an intentional "not yet." The one working link ("Código" on the Hub card) points to the hub's own repo, not to any of the claimed CV skills — a careful reader expecting proof gets the wrong artifact.

**Casey (mobile user)**: ≈3800px of scroll at 390px width for 10 near-identical cards compounds abandonment risk. `ThemeToggle` renders at 32×32px, under the 44×44pt minimum touch target. The Next.js dev indicator sits directly over the first card's content at mobile width in dev — worth a conscious check that it's excluded from production (it is by default).

## Minor Observations

- `--faint-foreground` (`#71717a`) is the only color token without a separate `.dark` value — breaks the project's own stated "fully adapts per theme" rule; the browser scan only ran in light mode so this wasn't independently measured in dark, but it's a clear token-consistency gap worth closing regardless.
- `language-switcher.tsx` hardcodes `aria-label="Selector de idioma"` even on `/en`, contradicting DESIGN.md's own "never hardcode user-facing text" rule — small, direct violation of the project's stated i18n discipline.
- Detector flagged "overused font" (Geist, 100% of text) — plausibly intentional given the minimalist brief (Geist Mono is reserved, per DESIGN.md, for code/data not yet used); not treated as a priority issue, but a candidate spot for typographic variety (e.g. mono for the phase/size meta line) if the team wants more hierarchy.
- "Planned" status chip and the neutral stack-tag chip are visually very close in light mode — both read as "gray pill," slightly reducing the status badge's distinctiveness at a glance.

## Questions to Consider

1. If only 1 of 10 cards can prove anything today, should "Proyectos" be framed as a finished index yet — or would an honest "1 live, 9 on the roadmap" framing (with real timing) build more trust than presenting all 10 with equal confidence?
2. Should the hero's CTA lead straight to the one real, linked project instead of into a wall of plans — does the page need a "see the proof" path that bypasses the placeholder grid until more projects ship?
3. "Fase" and "Tamaño" clearly serve your own planning process — does that language need to be recruiter-facing at all, or could it move out of the card and free that space for something the audience cares about?
