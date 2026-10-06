"use client";

import { useEffect, RefObject } from "react";

/**
 * Fades + lifts every `.reveal` element inside `scope` as it scrolls into view.
 * Skipped entirely when the user prefers reduced motion.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;

    const load = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });
      }, scope);
    };

    load();
    return () => ctx?.revert();
  }, [scope]);
}
