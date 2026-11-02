import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { projects } from "@/content/projects";
import type { ProjectStatus } from "@/content/types";
import { ProjectCard } from "./project-card";

const statusLabelKey: Record<ProjectStatus, keyof Dictionary> = {
  planned: "statusPlanned",
  "in-progress": "statusInProgress",
  live: "statusLive",
};

export function ProjectsSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="w-full max-w-5xl scroll-mt-8 px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.projectsHeading}
        </h2>
        <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground">
          {dict.projectsSubheading}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            lang={lang}
            index={index}
            statusLabel={dict[statusLabelKey[project.status]]}
            repoLabel={dict.repoLabel}
            demoLabel={dict.demoLabel}
            comingSoonLabel={dict.comingSoonLabel}
          />
        ))}
      </div>
    </section>
  );
}
