"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] ${
        scrolled ? "nav-glass" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between w-full">
        {/* Logo */}
        <a
          href="#home"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span
            className="gradient-text"
            style={{ fontSize: "1.2rem", lineHeight: "1" }}
          >
            {siteConfig.name.split(" ")[0]}
          </span>
          <span
            style={{
              color: "var(--neon-green)",
              fontFamily: "var(--font-press-start), monospace",
              fontSize: "0.8rem",
              lineHeight: "1",
              marginTop: "4px",
            }}
          >
            .dev
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8" style={{ marginTop: "2px" }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn magnetic-btn-primary"
          >
            ▶ Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", cursor: "none" }}
        >
          <span
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: "0.8rem",
              color: "var(--neon-green)",
            }}
          >
            {isOpen ? "✕" : "▰▰▰"}
          </span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden border-t-4 border-[var(--neon-purple)]"
            style={{ background: "#000" }}
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="nav-link text-lg"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={siteConfig.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn magnetic-btn-primary self-start"
              >
                ▶ Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
