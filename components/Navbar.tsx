"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/constants";
import {
  openPalette,
  useActiveSection,
  useShortcutLabel,
} from "@/lib/useActiveSection";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const shortcut = useShortcutLabel();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] border-b transition-colors duration-200 ${
        scrolled
          ? "border-[var(--color-border)] bg-[rgba(10,10,11,0.82)] backdrop-blur-md"
          : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 w-full max-w-[1120px] items-stretch justify-between px-4 sm:px-6">
        {/* Prompt-style logo */}
        <Link
          href="/#home"
          className="flex items-center font-mono text-sm text-[var(--color-text)]"
        >
          <span className="text-[var(--color-accent)]">
            {siteConfig.name.split(" ")[0].toLowerCase()}
          </span>
          <span className="text-[var(--color-subtle)]">@portfolio</span>
          <span className="ml-1 text-[var(--color-muted)]">:~$</span>
        </Link>

        {/* Editor tabs */}
        <ul className="hidden items-stretch md:flex" role="list">
          {navLinks.slice(1).map((link) => {
            const isActive = active.href === link.href;
            return (
              <li key={link.href} className="flex">
                <a
                  href={`/${link.href}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`tab ${isActive ? "tab-active" : ""}`}
                >
                  {link.file}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* Command palette trigger (doubles as the mobile menu) */}
          <button
            onClick={openPalette}
            className="kbd-btn"
            aria-label="Open command palette"
          >
            <span className="md:hidden">menu</span>
            <span className="hidden md:inline">{shortcut}</span>
          </button>
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm hidden sm:inline-flex"
          >
            resume.pdf ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
