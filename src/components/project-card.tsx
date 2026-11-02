import type { Locale } from "@/i18n/config";
import type { Project, ProjectStatus } from "@/content/types";

const statusStyles: Record<ProjectStatus, string> = {
  planned: "bg-chip text-muted-foreground ring-border",
  "in-progress": "bg-amber-500/10 text-amber-800 ring-amber-500/30 dark:text-amber-400",
  live: "bg-emerald-500/10 text-emerald-800 ring-emerald-500/30 dark:text-emerald-400",
};

// Planned cards get a fainter, neutral border; in-progress/live cards get a
// status-colored accent border. Text and backgrounds are left untouched so
// this never risks contrast — the only lever is the border.
const cardBorderStyles: Record<ProjectStatus, string> = {
  planned: "border-border/50",
  "in-progress": "border-amber-500/40",
  live: "border-emerald-500/40",
};

const MAX_VISIBLE_STACK = 4;

export function ProjectCard({
  project,
  lang,
  statusLabel,
  repoLabel,
  demoLabel,
  comingSoonLabel,
  index,
}: {
  project: Project;
  lang: Locale;
  statusLabel: string;
  repoLabel: string;
  demoLabel: string;
  comingSoonLabel: string;
  index: number;
}) {
  const hasLinks = Boolean(project.repoUrl || project.demoUrl);
  const visibleStack = project.stack.slice(0, MAX_VISIBLE_STACK);
  const hiddenStackCount = project.stack.length - visibleStack.length;

  return (
    <article
      className={`project-card animate-fade-in-up flex flex-col gap-4 rounded-xl border ${cardBorderStyles[project.status]} bg-card p-6`}
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

      <p className="text-pretty text-sm leading-6 text-muted-foreground">
        {project.summary[lang]}
      </p>

      <ul className="flex flex-wrap gap-2">
        {visibleStack.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-chip px-2 py-1 text-xs text-chip-foreground"
          >
            {tech}
          </li>
        ))}
        {hiddenStackCount > 0 && (
          <li
            className="rounded-md bg-chip px-2 py-1 text-xs text-chip-foreground"
            title={project.stack.slice(MAX_VISIBLE_STACK).join(", ")}
          >
            +{hiddenStackCount}
          </li>
        )}
      </ul>

      <div className="mt-auto flex items-center justify-end gap-3 pt-2 text-xs">
        {hasLinks ? (
          <>
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
          </>
        ) : (
          <span className="text-faint-foreground">{comingSoonLabel}</span>
        )}
      </div>
    </article>
  );
}
