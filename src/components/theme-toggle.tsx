"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

// Both icons stay mounted and cross-fade with a half-turn rotation — avoids
// the jump-cut of swapping elements. Deliberately NOT the site's usual
// --ease-out-strong: that curve front-loads almost all of its motion in the
// first third of the duration, which makes a decorative rotation read as
// "already done" before it visually finishes. A gentler, more even ease-out
// spreads the sweep across the full 400ms so the turn is actually visible.
// Transitions `rotate` (the native CSS property Tailwind v4's rotate-*
// utilities set), not `transform` — transitioning `transform` here silently
// does nothing, since rotate-* never touches it.
// Respects reduced motion by disabling the transition, not the icon swap.
const iconTransition =
  "absolute h-4 w-4 transition-[rotate,opacity] duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none";

function SunIcon({ visible }: { visible: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
      className={`${iconTransition} ${visible ? "rotate-0 opacity-100" : "rotate-180 opacity-0"}`}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ visible }: { visible: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`${iconTransition} ${visible ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"}`}
    >
      <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z" />
    </svg>
  );
}

export function ThemeToggle({
  toLightLabel,
  toDarkLabel,
}: {
  toLightLabel: string;
  toDarkLabel: string;
}) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage can be unavailable (private browsing); theme just won't persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? toLightLabel : toDarkLabel}
      className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-muted-foreground transition-colors duration-150 hover:text-foreground"
    >
      <SunIcon visible={isDark} />
      <MoonIcon visible={!isDark} />
    </button>
  );
}
