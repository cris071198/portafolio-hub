# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters, hiring managers, and technical interviewers evaluating
Cristhian Armas for a software engineering role, during or before a
hiring process. They land here to verify quickly that skills claimed
on the CV are real, not just listed.

## Product Purpose

A hub that links to one standalone project per technology on the CV.
Each project is a small, finished, working implementation of a
real-world case — not a tutorial clone — so a reviewer can confirm a
claimed skill in minutes instead of taking the CV on faith.

## Positioning

A generic portfolio lists technologies; this one proves each one with
a separate, runnable project solving a credible domain case (foreign
trade, finance, accounting, logistics, telecom) — inspired by real
production work but built with invented or public data, never
confidential client material. Every claim here must be defensible in
a live technical interview.

## Capabilities and Constraints

- No confidential material: projects are inspired by real past work
  (Indra, banks, clients) but use invented or public data; never real
  client code or names.
- Every stated capability must be defensible in an interview — no
  technology is added purely for show.
- Any quantitative claim (e.g. "processes N documents/minute") must
  have a reproducible benchmark in that project's own repo.
- Each linked project has its own repository, README (architecture,
  decisions, how to run it in one command), tests in CI, and either a
  deployed demo or a short video/GIF.
- This hub's project cards (`src/content/projects.ts`) are updated —
  `repo`, `demo`, `status` — as each of the 9 linked projects reaches
  "done." Most are still `planned`; see
  `../portafolio-plan/00-plan-general.md` for the full roadmap, phase
  order, and per-project specs.
- Bilingual by construction: every user-facing string ships in both
  Spanish and English (`src/i18n/`, `src/content/`), not retrofitted.

## Brand Commitments

Name: Cristhian Armas. No company/agency branding — this is a
personal, individually authored portfolio.

## Evidence on Hand

- Full roadmap and the spec for each of the 9 linked projects:
  `../portafolio-plan/` (sibling directory — planning docs, not part
  of this repo).
- This hub's own source repo:
  https://github.com/cris071198/portafolio-hub
- No experience history or contact links are recorded yet — real
  biographical data (employer, role, dates, achievements; LinkedIn
  URL) is still pending from the user. Do not invent these; the hub's
  experience/contact sections stay unbuilt until provided (see
  `src/content/experience.ts`, `src/content/contact.ts`).

## Product Principles

1. A project is inspired by real work, never a copy of it — no
   client names, no client code, no confidential data.
2. Every claim must survive a technical interview; nothing is listed
   to pad the stack.
3. A number is only stated if it is measured, with the benchmark
   reproducible in that project's repo.
4. A small, finished project beats a large, half-built one — each
   project defines its MVP and what's explicitly out of scope.
5. This hub is a living index: it updates as each of the 9 projects
   completes, not a one-time snapshot.
