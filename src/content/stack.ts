import type { StackGroup } from "./types";

// Curated, canonical view of the technologies across every linked project —
// not a raw dump of each card's stack list. Framework/language/service-level
// items only (e.g. "Angular", not "Signals"); per-project detail still lives
// on each ProjectCard. Names are normalized across projects that listed the
// same technology slightly differently (e.g. "Angular 20" / "Angular").
export const stackGroups: StackGroup[] = [
  {
    id: "languages",
    label: { es: "Lenguajes", en: "Languages" },
    items: ["TypeScript", "Python"],
  },
  {
    id: "frontend",
    label: { es: "Frontend", en: "Frontend" },
    items: ["Next.js", "Angular", "Vue 3", "Ionic", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: { es: "Backend", en: "Backend" },
    items: ["Spring Boot", "NestJS", "FastAPI"],
  },
  {
    id: "mobile",
    label: { es: "Mobile", en: "Mobile" },
    items: ["Flutter", "Capacitor"],
  },
  {
    id: "data",
    label: { es: "Datos", en: "Data" },
    items: ["PostgreSQL", "SQLite", "Supabase"],
  },
  {
    id: "cloud",
    label: { es: "Cloud", en: "Cloud" },
    items: ["Docker", "AWS", "Azure"],
  },
  {
    id: "ai",
    label: { es: "IA y agentes", en: "AI & agents" },
    items: ["Flowise", "Model Context Protocol"],
  },
];
