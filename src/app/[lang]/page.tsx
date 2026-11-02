import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ProjectsSection } from "@/components/projects-section";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);

  return (
    <div className="flex flex-1 flex-col items-center">
      <header className="flex w-full max-w-5xl items-center justify-between px-6 py-8">
        <p className="text-sm font-medium tracking-tight text-zinc-400">
          {dict.greeting}
        </p>
        <LanguageSwitcher locales={locales} currentLang={lang as Locale} />
      </header>

      <ProjectsSection lang={lang as Locale} dict={dict} />
    </div>
  );
}
