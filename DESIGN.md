# Design system — Portfolio hub

Living reference for the visual language of this project. Every new
section (Hero, stack summary, experience, contact) should reuse these
tokens and patterns instead of introducing new ones. Built following
[Emil Kowalski's design engineering principles](https://emilkowal.ski/)
— unseen details compound, beauty is leverage.

## Visual language

Minimalist, content-first, dark **and** light. No decoration without
purpose: every animation exists to orient, give feedback, or prevent a
jarring change — never "because it looks cool."

## Color tokens

Defined in `src/app/globals.css` as CSS custom properties on `:root`
(light) and `.dark` (dark), exposed as Tailwind utilities via
`@theme inline`. Components reference only the semantic names — never
raw `zinc-*`/`black`/`white` — so the whole UI adapts automatically
when the theme toggles.

| Token | Utility class | Light | Dark | Used for |
|---|---|---|---|---|
| `--background` | `bg-background` | `#ffffff` | `#000000` | Page background |
| `--foreground` | `text-foreground` | `#18181b` | `#fafafa` | Primary text, headings |
| `--muted-foreground` | `text-muted-foreground` | `#52525b` | `#a1a1aa` | Secondary text (summaries, subheadings) |
| `--faint-foreground` | `text-faint-foreground` | `#71717a` | `#86868f` | Tertiary meta text ("coming soon" label, inactive nav) |
| `--border` | `border-border` | `#e4e4e7` | `#27272a` | Card borders |
| `--card` | `bg-card` | `#fafafa` | `rgb(24 24 27 / .4)` | Card background |
| `--chip` | `bg-chip` | `#f4f4f5` | `rgb(39 39 42 / .8)` | Stack badges, neutral status pill |
| `--chip-foreground` | `text-chip-foreground` | `#3f3f46` | `#d4d4d8` | Stack badge text |

`--faint-foreground` is the one token where light and dark aren't the
same hex: `#71717a` (zinc-500) measures 4.83:1 on the light background
but only 4.35:1 against pure black — an Impeccable `critique` caught
this failing AA in dark mode. The dark value is a custom shade between
zinc-500 and zinc-400, picked to clear 4.5:1 with a small margin
without jumping all the way to `muted-foreground`'s brightness (which
would erase the two-tier distinction between them). If you add another
token here, verify its dark-mode contrast explicitly — don't assume
one hex works for both themes just because it happened to elsewhere.

Status accent colors (amber = in progress, emerald = live) stay as
direct Tailwind utilities with explicit `dark:` variants, since they
only appear in one place (`ProjectCard` status badge) and need
different lightness per theme for contrast — not worth promoting to a
shared token yet.

## Theme switching

- `@custom-variant dark (&:where(.dark, .dark *));` — Tailwind v4's
  manual (class-based) dark mode, not the `prefers-color-scheme`
  media query default.
- A blocking inline `<script>` in `src/app/[lang]/layout.tsx`'s
  `<head>` reads `localStorage.theme`, falling back to
  `prefers-color-scheme`, and sets the `.dark` class on `<html>`
  **before paint** — no flash of the wrong theme.
- `ThemeToggle` (`src/components/theme-toggle.tsx`) reads the class
  via `useSyncExternalStore` (not `useEffect` + `setState` — this
  project's ESLint config rejects that pattern as a cascading-render
  risk) and persists the choice to `localStorage` on click.
- `<html suppressHydrationWarning>` because the class is set by a
  script outside React's render, which is expected and safe here.

## Typography

Geist Sans (`--font-sans`) for UI text, Geist Mono (`--font-mono`)
reserved for anything code-like (not yet used). Loaded via
`next/font/google` in the root layout, applied with the `font-sans`
utility on `<body>`.

Every wrapped paragraph uses Tailwind's `text-pretty` (CSS
`text-wrap: pretty`) so the browser avoids leaving a short orphaned
word alone on the last line — an Impeccable `critique` flagged exactly
that on three card descriptions. Apply it to any new multi-line
paragraph-role text by default; it's a no-risk progressive enhancement
(unsupported browsers just keep normal wrapping).

## Motion

Every animation in this project answers three questions before it
ships: *should this animate at all, what's the purpose, what's the
easing* — per the Animation Decision Framework. Nothing animates "for
flair."

### Easing & duration

```css
--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
```

A stronger ease-out than the CSS default — starts fast, gives
immediate visual feedback. Used for every UI transition in this
project; never `ease-in` (feels sluggish, delays the moment the user
is watching most).

| Interaction | Duration | Easing |
|---|---|---|
| Card hover (lift + color) | 200ms | `--ease-out-strong` |
| Link color change | 150ms | default `ease` |
| Grid entrance (per card) | 500ms | `--ease-out-strong` |

### Grid entrance — Fade in + Slide in (up), staggered

`ProjectCard` enters with a combined **Fade in** (opacity 0→1) and
**Slide in** from below (`translateY(8px → 0)`), sequenced as a
**Stagger** across the grid — each card's `animation-delay` is
`index * 40ms`, capped at `280ms` so a 10-item grid doesn't drag out.
Purpose: this is an occasional animation (plays once per page load,
not a frequent interaction), so a standard entrance is justified per
the frequency-of-use rule — it would be wrong on something like a
keyboard-triggered toggle.

`prefers-reduced-motion: reduce` disables the animation entirely
(`animation: none !important`), leaving content visible — motion is
removed, not just slowed, since it's purely decorative here.

### Theme toggle: sun/moon rotation

The two icons stay mounted and cross-fade with a half-turn rotation
(`rotate-180` ↔ `rotate-0`) instead of being swapped on click. Uses a
gentler, more evenly-paced curve
(`cubic-bezier(0.33,1,0.68,1)`, 400ms) than the site's usual
`--ease-out-strong` — that stronger curve front-loads nearly all its
motion in the first third of the duration, which made a 180° rotation
read as "already finished" well before it visually was. Reserve
`--ease-out-strong` for snappy UI feedback (hover, press); reach for a
plainer ease-out when a transform needs to stay visible across its
full duration.

**Tailwind v4 pitfall, verified the hard way**: `rotate-*` utilities
set the native CSS `rotate` property, not `transform`. A `transition-
[transform,...]` class on a `rotate-*` element compiles and applies
with zero errors, but the rotation never animates — nothing is wrong
syntactically, so there's nothing to catch it except actually watching
(or measuring) the transition. Confirmed by sampling
`getComputedStyle(el).rotate` across the transition with
`requestAnimationFrame`, not by eyeballing screenshots — screenshot
timing is too unreliable (`click()`'s own dispatch overhead varies) to
tell "finishes fast" apart from "never moved." Same applies to
`scale-*` (property `scale`) and `translate-*` (property `translate`)
— transition the matching native property, not `transform`, for any
of them.

### Hover feedback

Cards lift (`translateY(-4px)`) and their border/background lighten
on hover, gated behind `@media (hover: hover) and (pointer: fine)` so
touch devices never get a "stuck" hover state after a tap. Implemented
as plain CSS (`.project-card:hover` in `globals.css`) rather than a
Tailwind arbitrary variant — more reliable to read and test than
chaining `[@media(...)]:hover:` utilities.

### What's intentionally *not* animated

- Language switcher / theme toggle: instant state, no transition on
  the click itself beyond the 150ms color fade — these can be used
  repeatedly and should feel immediate, not scripted.
- Status badges: static, no entrance of their own (they're part of
  the card's single entrance, not a separate moment).

## Component patterns

### Site nav (`SiteNav`)

A full-width `sticky top-0` `<header>` with `bg-background/70
backdrop-blur-md` and a `border-b border-border/60`, wrapping an inner
`<nav>` constrained to `max-w-5xl` and centered — the blur/translucency
has to span the full viewport width even though the nav content
doesn't, so the glass effect is on the outer element, not the inner
one. Section anchors (`#projects`, `#stack`) use `scroll-mt-24` (not
the `scroll-mt-8` used before the nav went sticky) so a jump-link
doesn't land with its heading hidden under the bar.

### Card (`ProjectCard`)

`rounded-xl border border-border bg-card p-6`, vertical flex layout:
title + status badge → summary → stack chips → a footer pinned to the
bottom with `mt-auto`: repo/demo links when they exist, or an honest
"Próximamente"/"Coming soon" label when they don't — never blank
space. No internal roadmap metadata (phase/size) is shown; it reads
as unexplained jargon to the hub's actual audience (recruiters) and
isn't rendered here, even though it's still tracked in
`src/content/projects.ts` for planning purposes.

### Status badge

`rounded-full ring-1 ring-inset` pill, color keyed by
`ProjectStatus` (`planned` / `in-progress` / `live`). Neutral
(`chip`/`muted-foreground`) for planned; accent color only for states
that need attention (in progress, live).

The accent text is `amber-800`/`emerald-800` (light) and
`amber-400`/`emerald-400` (dark) — not the more obvious `-600` step.
An Impeccable `critique` measured the `-600` pairing at 2.8:1 against
its `/10`-opacity pill background (needs 4.5:1 for body-size text);
`-700` still fell just short at 4.46:1 once actually rendered, `-800`
clears it. **Don't trust a hand-picked shade step for small colored
text on a tinted background — verify the real rendered contrast.**

### Stack chips: cap at 4

A card shows at most 4 stack chips; beyond that, a `+N` chip replaces
the rest (full list in its `title` tooltip). Fixes a cognitive-load
finding (>4 items in one visual group) on cards with 5-6 technologies.
The `+N` chip reuses `text-chip-foreground`, not `text-faint-foreground`
— the fainter token measured 4.4:1 on the chip background here, just
under AA; same lesson as the status badge, a token that's fine in one
context isn't guaranteed fine on every background.

### Stack summary (`StackSummary`)

A separate, curated view of the technologies across every linked
project — not a dump of each card's raw `stack` array. Lives in
`src/content/stack.ts` as `StackGroup[]` (id, bilingual label, item
list), rendered as a two-column grid of label + chip row, reusing the
exact same `bg-chip`/`text-chip-foreground` chip used on project
cards (cohesion over inventing a new tag style).

Deliberately curated, not generated from `projects.ts`: it lists only
nameable frameworks/languages/services (what a recruiter would search
a CV for — Next.js, PostgreSQL, Docker), not implementation-detail
items that stay on individual cards (Signals, Web Workers, Pinia, Vue
Router, Bloc, Geolocation). Per-project technology names are also
normalized here across projects that phrased the same thing slightly
differently (e.g. "Angular 20" / "Angular" → "Angular"; "Tailwind CSS
4" / "Tailwind CSS" → "Tailwind CSS"), and the three separate AWS/Azure
services each project lists are consolidated to one "AWS" / "Azure"
chip at this summary level. If `projects.ts` ever stops matching this
curation (a new project adds a technology not reflected here), update
`stack.ts` by hand — it is not auto-derived.

### Card border (visual weight by status)

An Impeccable `critique` flagged that every card — one real,
inspectable project and nine placeholders — carried identical visual
weight, so the one thing worth clicking didn't stand out. Fixed via
border color only, keyed by `ProjectStatus`: `border-border/50`
(fainter than the default) for `planned`, `border-amber-500/40` for
`in-progress`, `border-emerald-500/40` for `live`. Deliberately not
done with opacity or background dimming — that would have touched
text contrast, which was already a flagged issue elsewhere. The
`.project-card:hover` rule in `globals.css` no longer overrides
border-color (it used to reset every card to the same neutral hover
border, flattening this distinction); hover now only lifts
(`translateY`) and shifts background.

### Stack chip

`rounded-md bg-chip text-chip-foreground`, one per technology, no
icons — text-only badges keep the card scannable at a glance across
very different tech stacks (Spring Boot next to Flutter next to
FastAPI).

## i18n

Content strings live in `src/i18n/dictionaries.ts` (UI copy) and
`src/content/*.ts` (project/experience/contact data, each field keyed
by locale). Never hardcode user-facing text in a component — always
pull from the dictionary or content layer so both `/es` and `/en` stay
in sync by construction.

## SEO & metadata

- `src/app/[lang]/layout.tsx` uses `generateMetadata` (not a static
  `metadata` export) so title, description, and Open Graph/Twitter
  tags are generated per locale from the dictionary — never hardcode
  SEO copy separately from the dictionary strings it mirrors.
- `alternates.canonical` + `alternates.languages` emit `hreflang` for
  both `/es` and `/en` on every page.
- `src/app/[lang]/opengraph-image.tsx` generates the share image at
  request time with `next/og`'s `ImageResponse` — no external
  image-generation tool or static asset, matches the dark/minimalist
  brand, and is bilingual (reads the same dictionary). Uses Satori's
  default font rather than loading Geist's font file explicitly; close
  enough visually, revisit only if the mismatch becomes noticeable.
- `src/app/sitemap.ts` and `src/app/robots.ts` are root-level
  (sibling to `[lang]/`, not inside it) — Next's file convention for
  `/sitemap.xml` and `/robots.txt`.
- `src/lib/site.ts` exports the single `siteUrl` every one of the
  above reads from `NEXT_PUBLIC_SITE_URL` (`.env.example` documents
  it), falling back to `localhost:3000`. **No domain is decided yet**
  (see `portafolio-plan/00-plan-general.md`, "Decisiones abiertas") —
  set that env var at deploy time or every absolute URL emitted
  (canonical, OG, sitemap entries) will point at localhost.

## Accessibility

- Reduced motion respected everywhere motion is decorative (see
  Motion section).
- Hover-only affordances gated to fine-pointer devices.
- `aria-current="true"` on the active language link; `aria-label` on
  the theme toggle describes the action it performs, not the current
  state.
- Still open: full keyboard/focus-ring audit and screen-reader pass
  (tracked as step 7 in `portafolio-plan/projects/00-hub.md`).

## Open items

Experience and contact sections are not built yet — blocked on real
biographical data (see `portafolio-plan/projects/00-hub.md`,
"Progreso"). Mobile navigation, SEO/metadata, and deployment are later
steps in the same plan.
