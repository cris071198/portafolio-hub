import type { Locale } from "@/i18n/config";
import type { Project, ProjectStatus } from "@/content/types";

const statusStyles: Record<ProjectStatus, string> = {
  planned: "bg-chip text-muted-foreground ring-border",
  "in-progress": "bg-amber-500/10 text-amber-600 ring-amber-500/30 dark:text-amber-400",
  live: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/30 dark:text-emerald-400",
};

export function ProjectCard({
  project,
  lang,
  statusLabel,
  phaseLabel,
  sizeLabel,
  repoLabel,
  demoLabel,
  index,
}: {
  project: Project;
  lang: Locale;
  statusLabel: string;
  phaseLabel: string;
  sizeLabel: string;
  repoLabel: string;
  demoLabel: string;
  index: number;
}) {
  return (
    <article
      className="project-card animate-fade-in-up flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
      style={{ animationDelay: `${Math.min(index * 40, 280)}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {project.title[lang]}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[project.status]}`}
        >
          {statusLabel}
        </span>
      </div>

      <p className="text-sm leading-6 text-muted-foreground">
        {project.summary[lang]}
      </p>

      <ul className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-chip px-2 py-1 text-xs text-chip-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between pt-2 text-xs text-faint-foreground">
        <span>
          {phaseLabel} {project.phase} · {sizeLabel} {project.size}
        </span>
        <span className="flex gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {repoLabel}
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {demoLabel}
            </a>
          )}
        </span>
      </div>
    </article>
  );
}
