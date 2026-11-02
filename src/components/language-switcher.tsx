"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

const labels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export function LanguageSwitcher({
  locales,
  currentLang,
}: {
  locales: readonly Locale[];
  currentLang: Locale;
}) {
  const pathname = usePathname() ?? `/${currentLang}`;
  const rest = pathname.slice(`/${currentLang}`.length);

  return (
    <nav aria-label="Selector de idioma" className="flex gap-3 text-sm">
      {locales.map((locale) => {
        const isCurrent = locale === currentLang;
        return (
          <Link
            key={locale}
            href={`/${locale}${rest}`}
            aria-current={isCurrent ? "true" : undefined}
            className={
              isCurrent
                ? "font-semibold text-foreground"
                : "text-faint-foreground transition-colors duration-150 hover:text-muted-foreground"
            }
          >
            {labels[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
