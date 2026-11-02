import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SiteNav } from "@/components/site-nav";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { StackSummary } from "@/components/stack-summary";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);

  return (
    <div className="flex flex-1 flex-col items-center">
      <SiteNav lang={lang as Locale} dict={dict} />

      <HeroSection dict={dict} />

      <ProjectsSection lang={lang as Locale} dict={dict} />

      <StackSummary lang={lang as Locale} dict={dict} />
    </div>
  );
}
