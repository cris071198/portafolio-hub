// No domain has been decided yet (see portafolio-plan/00-plan-general.md,
// "Decisiones abiertas"). Set NEXT_PUBLIC_SITE_URL once one is picked; until
// then this falls back to localhost so metadata/sitemap/robots still work.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
