"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, siteConfig } from "@/lib/constants";
import { openPalette, useShortcutLabel } from "@/lib/useActiveSection";
import MagneticButton from "./MagneticButton";
import SocialIcon from "./SocialIcon";

// ─── Constants ────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { href: siteConfig.links.github, icon: "github", label: "GitHub" },
  { href: siteConfig.links.linkedin, icon: "linkedin", label: "LinkedIn" },
  { href: siteConfig.links.medium, icon: "medium", label: "Medium" },
  { href: siteConfig.links.instagram, icon: "instagram", label: "Instagram" },
] as const;

const COMMAND = "whoami";
const TYPE_START_MS = 250;
const TYPE_STEP_MS = 75;

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Types `text` one character at a time; returns the visible portion. */
function useTypewriter(text: string) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      if (reduced) {
        setCount(text.length);
        return;
      }
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, TYPE_STEP_MS);
    }, reduced ? 0 : TYPE_START_MS);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text]);

  return { typed: text.slice(0, count), done: count >= text.length };
}

/** Reveals the "command output" once the command has been typed. */
function useHeroAnimation(scope: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;

    const animate = async () => {
      const gsap = (await import("gsap")).default;
      ctx = gsap.context(() => {
        gsap.from(".hero-item", {
          y: 14,
          opacity: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          delay: (TYPE_START_MS + TYPE_STEP_MS * COMMAND.length) / 1000 + 0.1,
        });
      }, scope);
    };

    animate();
    return () => ctx?.revert();
  }, [scope]);
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { typed, done } = useTypewriter(COMMAND);
  const shortcut = useShortcutLabel();
  useHeroAnimation(sectionRef);

  const [first, ...rest] = siteConfig.name.split(" ");

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="hero-bg" />
      <div className="hero-glow" />

      <div className="relative mx-auto w-full max-w-[1120px] px-4 pb-16 pt-24 sm:px-6">
        <div className="card overflow-hidden shadow-2xl shadow-black/50">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#3f3f46]" />
            <span className="h-3 w-3 rounded-full bg-[#3f3f46]" />
            <span className="h-3 w-3 rounded-full bg-[#3f3f46]" />
            <span className="ml-3 truncate font-mono text-xs text-[var(--color-subtle)]">
              {first.toLowerCase()}@portfolio: ~
            </span>
            <span className="ml-auto font-mono text-xs text-[var(--color-subtle)]">
              zsh
            </span>
          </div>

          <div className="p-6 sm:p-10 lg:p-14">
            {/* Typed command */}
            <p className="font-mono text-sm text-[var(--color-muted)] sm:text-base">
              <span className="text-[var(--color-accent)]">~/{first.toLowerCase()}</span>{" "}
              $ {typed}
              {!done && <span className="cursor-blink">▍</span>}
            </p>

            {/* Output */}
            <h1 className="hero-item mt-6 font-mono text-[clamp(2.5rem,9vw,6.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.06em]">
              <span className="block">{first}</span>
              <span className="block">
                {rest.join(" ")}
                <span className="cursor-blink text-[var(--color-accent)]">_</span>
              </span>
            </h1>

            <p className="hero-item mt-6 font-mono text-base text-[var(--color-accent)] sm:text-lg">
              full stack &amp; ai engineer
            </p>

            <p className="hero-item mt-3 max-w-xl text-[var(--color-muted)]">
              I build scalable web platforms and AI-powered developer tools with
              Next.js, Node.js and TypeScript — with a soft spot for Rust and
              clean, fast interfaces.
            </p>

            <div className="hero-item mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href="#projects" className="btn-primary font-mono">
                ./view-projects
              </MagneticButton>
              <MagneticButton
                href={siteConfig.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary font-mono"
              >
                resume.pdf ↗
              </MagneticButton>
              <button
                onClick={openPalette}
                className="hidden items-center gap-2 px-2 font-mono text-xs text-[var(--color-subtle)] transition-colors hover:text-[var(--color-text)] md:inline-flex"
              >
                or press <kbd className="kbd">{shortcut}</kbd>
              </button>
            </div>

            {/* File index */}
            <nav
              aria-label="Sections"
              className="hero-item mt-12 grid gap-x-8 gap-y-1 border-t border-dashed border-[var(--color-border-strong)] pt-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {navLinks.slice(1).map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-baseline gap-3 rounded-md py-2 font-mono text-sm"
                >
                  <span className="text-[var(--color-subtle)]">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <span className="text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
                    {link.file}
                  </span>
                  <span className="truncate text-xs text-[var(--color-subtle)]">
                    {link.desc}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border)] px-6 py-3 sm:px-10 lg:px-14">
            <span className="font-mono text-xs text-[var(--color-subtle)]">
              <span className="text-[var(--color-accent)]">●</span> kerala, india
            </span>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ href, icon, label }) => (
                <a
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[var(--color-subtle)] transition-colors hover:text-[var(--color-text)]"
                >
                  <SocialIcon name={icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
