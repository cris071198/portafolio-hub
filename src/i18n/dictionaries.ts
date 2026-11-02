import type { Locale } from "./config";

const dictionaries = {
  es: {
    greeting: "Portafolio en construcción",
    switchToLabel: "English",
  },
  en: {
    greeting: "Portfolio under construction",
    switchToLabel: "Español",
  },
} satisfies Record<Locale, Record<string, string>>;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
