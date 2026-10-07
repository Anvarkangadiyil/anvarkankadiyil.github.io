"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { navLinks } from "@/lib/constants";

/** Returns the nav entry for the section currently in the middle of the viewport. */
export function useActiveSection() {
  const [active, setActive] = useState(navLinks[0]);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = navLinks.find((l) => l.href === `#${entry.target.id}`);
          if (match) setActive(match);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

/** Opens the command palette from anywhere (buttons, status bar, hero). */
export function openPalette() {
  window.dispatchEvent(new Event("palette:open"));
}

/** "⌘K" on Apple devices, "Ctrl K" elsewhere (server renders "Ctrl K" to avoid a hydration mismatch). */
const noopSubscribe = () => () => {};

export function useShortcutLabel() {
  return useSyncExternalStore(
    noopSubscribe,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘K" : "Ctrl K"),
    () => "Ctrl K",
  );
}
