import type { Dictionary } from "@/i18n/dictionaries";

export function HeroSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="animate-fade-in-up flex w-full max-w-5xl flex-col gap-4 px-6 pb-20 pt-4">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Cristhian Armas
      </h1>
      <p className="text-lg font-medium text-muted-foreground">
        {dict.heroRole}
      </p>
      <p className="max-w-xl text-pretty text-sm leading-6 text-muted-foreground">
        {dict.heroTagline}
      </p>
      <a
        href="#projects"
        className="mt-2 w-fit rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-chip"
      >
        {dict.heroCta}
      </a>
    </section>
  );
}
