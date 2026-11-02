import type { Locale } from "./config";

const dictionaries = {
  es: {
    greeting: "Portafolio en construcción",
    switchToLabel: "English",
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
  },
  en: {
    greeting: "Portfolio under construction",
    switchToLabel: "Español",
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
  },
} satisfies Record<Locale, Record<string, string>>;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
