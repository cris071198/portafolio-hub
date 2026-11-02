import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "@/components/language-switcher";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-16 text-center">
      <p className="text-3xl font-semibold tracking-tight">{dict.greeting}</p>
      <LanguageSwitcher locales={locales} currentLang={lang as Locale} />
    </div>
  );
}
