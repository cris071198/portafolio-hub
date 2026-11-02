import type { Locale } from "@/i18n/config";

export type Translated = Record<Locale, string>;

export type ProjectStatus = "planned" | "in-progress" | "live";
export type ProjectSize = "S" | "M" | "L";
export type ProjectPhase = 1 | 2 | 3 | 4;

export interface Project {
  id: string;
  order: number;
  title: Translated;
  summary: Translated;
  stack: string[];
  phase: ProjectPhase;
  size: ProjectSize;
  status: ProjectStatus;
  repoUrl?: string;
  demoUrl?: string;
}

export interface ExperienceEntry {
  company: string;
  role: Translated;
  period: string;
  highlights: Translated[];
}

export interface ContactLink {
  label: string;
  href: string;
}
