import { siteConfig, navLinks } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t-[4px] border-[var(--neon-green)] bg-[var(--bg-primary)] mt-16 ">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="text-xl font-bold text-[var(--neon-green)] uppercase"
              style={{ fontFamily: "var(--font-press-start)" }}
            >
              &gt; {siteConfig.name.split(" ")[0]}
              <span className="text-[var(--neon-cyan)]">_</span>
            </a>
            <p
              className="text-[var(--text-secondary)] mt-4 text-sm leading-relaxed uppercase"
              style={{ fontFamily: "var(--font-vt323)" }}
            >
              &gt; Crafting scalable digital experiences. Always learning.
              Always building.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3
              className="text-sm font-semibold text-[var(--neon-cyan)] tracking-wider uppercase mb-4"
              style={{ fontFamily: "var(--font-press-start)" }}
            >
              [ Navigation ]
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-lg uppercase text-[var(--text-primary)] hover:text-[var(--neon-green)] transition-colors"
                    style={{ fontFamily: "var(--font-vt323)" }}
                  >
                    &gt; {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3
              className="text-sm font-semibold text-[var(--neon-cyan)] tracking-wider uppercase mb-4"
              style={{ fontFamily: "var(--font-press-start)" }}
            >
              [ Connect ]
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg uppercase text-[var(--text-primary)] hover:text-[var(--neon-green)] transition-colors"
                  style={{ fontFamily: "var(--font-vt323)" }}
                >
                  &gt; GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg uppercase text-[var(--text-primary)] hover:text-[var(--neon-green)] transition-colors"
                  style={{ fontFamily: "var(--font-vt323)" }}
                >
                  &gt; LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg uppercase text-[var(--text-primary)] hover:text-[var(--neon-green)] transition-colors"
                  style={{ fontFamily: "var(--font-vt323)" }}
                >
                  &gt; Medium
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg uppercase text-[var(--text-primary)] hover:text-[var(--neon-green)] transition-colors"
                  style={{ fontFamily: "var(--font-vt323)" }}
                >
                  &gt; Instagram
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-lg uppercase text-[var(--text-primary)] hover:text-[var(--neon-green)] transition-colors"
                  style={{ fontFamily: "var(--font-vt323)" }}
                >
                  &gt; {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t-[4px] border-[var(--neon-purple)] pt-8 text-center w-full">
          <p
            className="text-lg uppercase text-[var(--text-secondary)]"
            style={{ fontFamily: "var(--font-vt323)" }}
          >
            [ SYSTEM RUNNING OK ] :: © {new Date().getFullYear()}{" "}
            {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
