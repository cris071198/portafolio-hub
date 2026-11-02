import type { Locale } from "./config";

const dictionaries = {
  es: {
    heroRole: "Ingeniero de software",
    heroTagline:
      "Un proyecto nuevo por cada tecnología de mi CV, resolviendo casos de comercio exterior, finanzas, logística y telecom.",
    heroCta: "Ver proyectos",
    projectsHeading: "Proyectos",
    projectsSubheading:
      "Un proyecto nuevo por cada stack del CV. Cada uno resuelve un caso del dominio de comercio exterior, finanzas, contabilidad, logística o telecom.",
    statusPlanned: "Planeado",
    statusInProgress: "En progreso",
    statusLive: "En vivo",
    phaseLabel: "Fase",
    sizeLabel: "Tamaño",
    repoLabel: "Código",
    demoLabel: "Demo",
    themeToggleToLight: "Cambiar a tema claro",
    themeToggleToDark: "Cambiar a tema oscuro",
  },
  en: {
    heroRole: "Software Engineer",
    heroTagline:
      "A new project for every technology on my résumé, solving cases from trade, finance, logistics, and telecom.",
    heroCta: "View projects",
    projectsHeading: "Projects",
    projectsSubheading:
      "A new project for every stack on the résumé. Each one solves a case from the trade, finance, accounting, logistics, or telecom domain.",
    statusPlanned: "Planned",
    statusInProgress: "In progress",
    statusLive: "Live",
    phaseLabel: "Phase",
    sizeLabel: "Size",
    repoLabel: "Code",
    demoLabel: "Demo",
    themeToggleToLight: "Switch to light theme",
    themeToggleToDark: "Switch to dark theme",
  },
} satisfies Record<Locale, Record<string, string>>;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
