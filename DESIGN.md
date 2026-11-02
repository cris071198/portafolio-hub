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
| `--faint-foreground` | `text-faint-foreground` | `#71717a` | `#71717a` | Tertiary meta text ("coming soon" label, inactive nav) |
| `--border` | `border-border` | `#e4e4e7` | `#27272a` | Card borders |
| `--card` | `bg-card` | `#fafafa` | `rgb(24 24 27 / .4)` | Card background |
| `--chip` | `bg-chip` | `#f4f4f5` | `rgb(39 39 42 / .8)` | Stack badges, neutral status pill |
| `--chip-foreground` | `text-chip-foreground` | `#3f3f46` | `#d4d4d8` | Stack badge text |

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

Hero section, grouped stack summary, experience, and contact are not
built yet — experience and contact are blocked on real biographical
data (see `portafolio-plan/projects/00-hub.md`, "Progreso"). Mobile
navigation, SEO/metadata, and deployment are later steps in the same
plan.
