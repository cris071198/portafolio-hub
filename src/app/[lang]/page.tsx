import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);

  return (
    <div className="flex flex-1 flex-col items-center">
      <nav className="flex w-full max-w-5xl justify-end gap-4 px-6 py-8">
        <LanguageSwitcher locales={locales} currentLang={lang as Locale} />
        <ThemeToggle
          toLightLabel={dict.themeToggleToLight}
          toDarkLabel={dict.themeToggleToDark}
        />
      </nav>

      <HeroSection dict={dict} />

      <ProjectsSection lang={lang as Locale} dict={dict} />
    </div>
  );
}
