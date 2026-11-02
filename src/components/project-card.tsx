import type { Locale } from "@/i18n/config";
import type { Project, ProjectStatus } from "@/content/types";

const statusStyles: Record<ProjectStatus, string> = {
  planned: "bg-zinc-800 text-zinc-400 ring-zinc-700",
  "in-progress": "bg-amber-500/10 text-amber-400 ring-amber-500/30",
  live: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
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
      className="project-card animate-fade-in-up flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
      style={{ animationDelay: `${Math.min(index * 40, 280)}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-zinc-50">
          {project.title[lang]}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[project.status]}`}
        >
          {statusLabel}
        </span>
      </div>

      <p className="text-sm leading-6 text-zinc-400">{project.summary[lang]}</p>

      <ul className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-zinc-800/80 px-2 py-1 text-xs text-zinc-300"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between pt-2 text-xs text-zinc-500">
        <span>
          {phaseLabel} {project.phase} · {sizeLabel} {project.size}
        </span>
        <span className="flex gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition-colors duration-150 hover:text-zinc-50"
            >
              {repoLabel}
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition-colors duration-150 hover:text-zinc-50"
            >
              {demoLabel}
            </a>
          )}
        </span>
      </div>
    </article>
  );
}
