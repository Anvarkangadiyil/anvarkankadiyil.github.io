"use client";

import { useEffect, useRef, JSX } from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/lib/constants";
import MagneticButton from "./MagneticButton";

// ─── Lazy-load 3D scene (client-only) ────────────────────────────────────────

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="canvas-container bg-[var(--bg-primary)]" />,
});

// ─── Constants ────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { href: siteConfig.links.github, icon: "github", label: "GitHub" },
  { href: siteConfig.links.linkedin, icon: "linkedin", label: "LinkedIn" },
  { href: siteConfig.links.medium, icon: "medium", label: "Medium" },
  { href: siteConfig.links.instagram, icon: "instagram", label: "Instagram" },
] as const;

const CTA_BUTTONS = [
  {
    href: "#projects",
    label: "[ VIEW PROJECTS ]",
    className: "magnetic-btn-primary",
  },
  {
    href: "#contact",
    label: "[ CONTACT ME ]",
    className: "magnetic-btn-secondary",
  },
] as const;

// ─── Custom hook: entrance animation ─────────────────────────────────────────

function useHeroAnimation(refs: {
  heading: React.RefObject<HTMLElement | null>;
  sub: React.RefObject<HTMLElement | null>;
  cta: React.RefObject<HTMLElement | null>;
  social: React.RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    const animate = async () => {
      const gsap = (await import("gsap")).default;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          refs.heading.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 1.6 },
        )
        .fromTo(
          refs.sub.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4",
        )
        .fromTo(
          refs.cta.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.3",
        )
        .fromTo(
          refs.social.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        );
    };

    animate();
  }, [refs.heading, refs.sub, refs.cta, refs.social]);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroBadge({ ref }: { ref: React.Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      className="text-[var(--neon-green)] text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6"
      style={{ opacity: 0 }}
    >
      [ PLAYER 1 READY ] :: SOFTWARE DEVELOPER
    </p>
  );
}

function HeroHeading({ ref }: { ref: React.Ref<HTMLHeadingElement> }) {
  return (
    <h1
      ref={ref}
      className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-6 sm:mb-8 leading-tight"
      style={{ opacity: 0 }}
    >
      <span className="text-[var(--neon-cyan)]">&gt;</span> CRAFTING SCALABLE
      <br />
      <span className="gradient-text">DIGITAL EXPERIENCES</span>
      <span className="text-[var(--neon-cyan)] animate-pulse">_</span>
    </h1>
  );
}

function HeroCTA({ ref }: { ref: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12"
      style={{ opacity: 0 }}
    >
      {CTA_BUTTONS.map(({ href, label, className }) => (
        <MagneticButton
          key={href}
          href={href}
          className={`${className} w-full sm:w-auto`}
        >
          {label}
        </MagneticButton>
      ))}
    </div>
  );
}

function HeroSocials({ ref }: { ref: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className="flex items-center justify-center gap-4 sm:gap-6"
      style={{ opacity: 0 }}
    >
      {SOCIAL_LINKS.map(({ href, icon, label }) => (
        <a
          key={icon}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-[var(--neon-green)] hover:text-[var(--neon-cyan)] transition-colors touch-manipulation p-1"
        >
          <SocialIcon name={icon} />
        </a>
      ))}
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span
        className="text-[var(--neon-cyan)] text-[8px] sm:text-xs tracking-widest uppercase animate-pulse"
        style={{ fontFamily: "var(--font-press-start)" }}
      >
        INSERT COIN TO SCROLL ↓
      </span>
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    heading: headingRef,
    sub: subRef,
    cta: ctaRef,
    social: socialRef,
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background 3D canvas */}
      <HeroScene />

      {/* Foreground content */}
      <div className="hero-content text-center px-4 sm:px-6 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto w-full ">
        <HeroBadge ref={subRef} />
        <HeroHeading ref={headingRef} />
        <HeroCTA ref={ctaRef} />

        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <HeroSocials ref={socialRef} />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

// ─── Social icon map ──────────────────────────────────────────────────────────

function SocialIcon({ name }: { name: string }): JSX.Element | null {
  const icons: Record<string, JSX.Element> = {
    github: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    linkedin: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    medium: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
    instagram: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  };

  return icons[name] ?? null;
}
