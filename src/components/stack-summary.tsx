import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { stackGroups } from "@/content/stack";

export function StackSummary({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="w-full max-w-5xl px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.stackHeading}
        </h2>
        <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground">
          {dict.stackSubheading}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {stackGroups.map((group) => (
          <div key={group.id}>
            <h3 className="mb-2 text-sm font-medium text-foreground">
              {group.label[lang]}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md bg-chip px-2 py-1 text-xs text-chip-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
