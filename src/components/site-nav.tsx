import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function SiteNav({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <nav className="flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-8 text-sm">
      <div className="flex gap-5">
        <a
          href="#projects"
          className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          {dict.projectsHeading}
        </a>
        <a
          href="#stack"
          className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          {dict.stackHeading}
        </a>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher
          locales={locales}
          currentLang={lang}
          navLabel={dict.languageSwitcherLabel}
        />
        <ThemeToggle
          toLightLabel={dict.themeToggleToLight}
          toDarkLabel={dict.themeToggleToDark}
        />
      </div>
    </nav>
  );
}
