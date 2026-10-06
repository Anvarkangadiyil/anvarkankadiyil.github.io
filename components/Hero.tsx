"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/constants";
import MagneticButton from "./MagneticButton";
import SocialIcon from "./SocialIcon";

// ─── Constants ────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { href: siteConfig.links.github, icon: "github", label: "GitHub" },
  { href: siteConfig.links.linkedin, icon: "linkedin", label: "LinkedIn" },
  { href: siteConfig.links.medium, icon: "medium", label: "Medium" },
  { href: siteConfig.links.instagram, icon: "instagram", label: "Instagram" },
] as const;

const TERMINAL_LINES = [
  { cmd: "whoami", out: "anvar — full stack & ai engineer" },
  { cmd: "cat stack.txt", out: "next.js · node.js · typescript · rust · flutter" },
  { cmd: "cat now.txt", out: "software engineer @ ayat solutions" },
] as const;

// ─── Custom hook: entrance animation ─────────────────────────────────────────

function useHeroAnimation(scope: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;

    const animate = async () => {
      const gsap = (await import("gsap")).default;
      ctx = gsap.context(() => {
        gsap.from(".hero-item", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1,
        });
      }, scope);
    };

    animate();
    return () => ctx?.revert();
  }, [scope]);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Terminal() {
  return (
    <div className="hero-item card w-full max-w-md overflow-hidden shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#3f3f46]" />
        <span className="h-3 w-3 rounded-full bg-[#3f3f46]" />
        <span className="h-3 w-3 rounded-full bg-[#3f3f46]" />
        <span className="ml-2 font-mono text-xs text-[var(--color-subtle)]">
          ~/anvar
        </span>
      </div>
      <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed">
        {TERMINAL_LINES.map(({ cmd, out }) => (
          <div key={cmd}>
            <p className="text-[var(--color-muted)]">
              <span className="text-[var(--color-accent)]">$</span> {cmd}
            </p>
            <p className="text-[var(--color-text)]">{out}</p>
          </div>
        ))}
        <p className="text-[var(--color-muted)]">
          <span className="text-[var(--color-accent)]">$</span>{" "}
          <span className="cursor-blink">▍</span>
        </p>
      </div>
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroAnimation(sectionRef);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="hero-bg" />
      <div className="hero-glow" />

      <div className="relative mx-auto grid w-full max-w-[1120px] items-center gap-14 px-4 pt-28 pb-20 sm:px-6 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="hero-item eyebrow">&gt; hello, I&apos;m</p>

          <h1 className="hero-item text-[clamp(2.75rem,8vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            {siteConfig.name}
            <span className="cursor-blink">_</span>
          </h1>

          <p className="hero-item mt-4 text-[clamp(1.25rem,2.6vw,1.625rem)] font-medium tracking-tight text-[var(--color-muted)]">
            Full Stack &amp; AI Engineer
          </p>

          <p className="hero-item mt-6 max-w-xl text-[var(--color-muted)]">
            I build scalable web platforms and AI-powered developer tools with
            Next.js, Node.js and TypeScript — with a soft spot for Rust and
            clean, fast interfaces.
          </p>

          <div className="hero-item mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects" className="btn-primary">
              View projects →
            </MagneticButton>
            <MagneticButton
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Resume
            </MagneticButton>
          </div>

          <div className="hero-item mt-9 flex items-center gap-5">
            {SOCIAL_LINKS.map(({ href, icon, label }) => (
              <a
                key={icon}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[var(--color-subtle)] transition-colors hover:text-[var(--color-text)]"
              >
                <SocialIcon name={icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="hidden justify-end lg:flex">
          <Terminal />
        </div>
      </div>
    </section>
  );
}
