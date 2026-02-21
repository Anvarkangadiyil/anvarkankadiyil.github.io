"use client";

import { siteConfig, navLinks } from "@/lib/constants";

const SOCIAL = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "Medium", href: siteConfig.links.medium },
  { label: "Instagram", href: siteConfig.links.instagram },
  { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
];

const px = (
  size = "0.55rem",
  color = "var(--neon-cyan)",
): React.CSSProperties => ({
  fontFamily: "var(--font-press-start), monospace",
  fontSize: size,
  color,
  letterSpacing: "0.06em",
});

const vt = (color = "var(--text-secondary)"): React.CSSProperties => ({
  fontFamily: "var(--font-vt323), monospace",
  fontSize: "1.1rem",
  color,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
});

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-primary)",
        borderTop: "4px solid var(--neon-green)",
        marginTop: "4rem",
      }}
    >
      {/* Pixel ticker strip */}
      <div
        style={{
          height: 6,
          background:
            "repeating-linear-gradient(90deg, var(--neon-green) 0 12px, var(--neon-cyan) 12px 24px, var(--neon-purple) 24px 36px, #000 36px 48px)",
          opacity: 0.6,
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "3.5rem 1.5rem 2rem",
        }}
      >
        {/* 3-col grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <a href="#home" style={{ textDecoration: "none" }}>
              <span style={{ ...px("0.85rem", "var(--neon-green)") }}>
                &gt; {siteConfig.name.split(" ")[0]}
              </span>
              <span style={{ ...px("0.85rem", "var(--neon-cyan)") }}>_</span>
            </a>
            <p style={{ ...vt(), lineHeight: 1.7, fontSize: "1rem" }}>
              &gt; Crafting scalable digital experiences.{" "}
              <span style={{ color: "var(--neon-green)" }}>
                Always learning.
              </span>{" "}
              Always building.
            </p>

            {/* Status indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 4,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  background: "var(--neon-green)",
                  boxShadow: "0 0 8px var(--neon-green)",
                  animation: "pulse 2s steps(1) infinite",
                }}
              />
              <span style={{ ...px("0.45rem", "var(--neon-green)") }}>
                SYS ONLINE
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{ ...px("0.5rem"), marginBottom: "1rem" }}>[ NAV ]</h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={vt("var(--text-primary)")}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--neon-green)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                  >
                    &gt; {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 style={{ ...px("0.5rem"), marginBottom: "1rem" }}>
              [ CONNECT ]
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {SOCIAL.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={vt("var(--text-primary)")}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--neon-cyan)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                  >
                    &gt; {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "3px solid transparent",
            borderImage:
              "repeating-linear-gradient(90deg, var(--neon-purple) 0 6px, transparent 6px 12px) 1",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <span style={{ ...vt("var(--text-secondary)"), fontSize: "1rem" }}>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <span style={{ ...px("0.45rem", "var(--neon-purple)") }}>
            [ SYSTEM RUNNING OK ]
          </span>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0.2; }
          }
        `}</style>
      </div>
    </footer>
  );
}
