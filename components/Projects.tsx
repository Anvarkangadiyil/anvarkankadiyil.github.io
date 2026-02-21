"use client";

import { useEffect, useRef, useState } from "react";
import { projects, ProjectCategory } from "@/lib/projects";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const categories: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Mobile", value: "mobile" },
  { label: "AI", value: "ai" },
  { label: "Open Source", value: "opensource" },
];

// Tech tag colours — cycling through the neon palette
const TAG_PALETTE = [
  { color: "var(--neon-cyan)", bg: "rgba(0,255,255,0.08)" },
  { color: "var(--neon-purple)", bg: "rgba(255,0,255,0.08)" },
  { color: "var(--neon-green)", bg: "rgba(57,255,20,0.08)" },
];

export default function Projects() {
  const [active, setActive] = useState<string>("all");
  const sectionRef = useRef<HTMLElement>(null);

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category.includes(active as ProjectCategory));

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const heading = sectionRef.current?.querySelector(".section-heading");
      if (heading) {
        gsap.fromTo(
          heading,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: { trigger: heading, start: "top 85%" },
          },
        );
      }
    };
    loadGSAP();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-[var(--bg-secondary)]"
    >
      <div className="section-container">
        {/* Header */}
        <div className="flex justify-center items-center flex-col">
          <h2 className="section-heading">
            &gt; FEATURED <span className="gradient-text">PROJECTS</span>_
          </h2>
          <p
            className="section-subheading mx-auto text-center"
            style={{
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            [ SELECT A CATEGORY TO VIEW DATA ]
          </p>
        </div>
        {/* ── Category filter ── */}
        <div
          className="reveal-up"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={`filter-btn ${active === cat.value ? "active" : ""}`}
            >
              {active === cat.value ? "▶ " : ""}
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
            gap: 28,
            alignItems: "stretch",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "60px 0",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-press-start), monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                }}
              >
                NO PROJECTS FOUND_
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    cardRef.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.28 }}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div
        ref={cardRef}
        className="project-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition:
            "transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease",
        }}
      >
        {/* ── Image / preview area ── */}
        <div
          className="card-image"
          style={{
            height: 140,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Pixel grid background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(0,255,255,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,255,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Initial letter */}
          <span
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "#fff",
              textShadow:
                "4px 4px 0 var(--neon-cyan), -2px -2px 0 var(--neon-purple)",
              position: "relative",
              zIndex: 1,
              transition: "transform 0.2s",
              lineHeight: 1,
            }}
            className="card-initial"
          >
            {project.title.charAt(0)}
          </span>

          {/* Hover overlay — Problem / Results */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.92)",
              opacity: 0,
              transition: "opacity 0.2s",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "14px 16px",
              zIndex: 2,
            }}
            className="card-hover-overlay"
          >
            <span
              style={{
                fontFamily: "var(--font-press-start), monospace",
                fontSize: "0.4rem",
                color: "var(--neon-cyan)",
                letterSpacing: "0.1em",
                marginBottom: 5,
                display: "block",
              }}
            >
              ▶ PROBLEM
            </span>
            <p
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "1rem",
                color: "var(--text-primary)",
                lineHeight: 1.5,
                marginBottom: 10,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.problem}
            </p>
            <span
              style={{
                fontFamily: "var(--font-press-start), monospace",
                fontSize: "0.4rem",
                color: "var(--neon-purple)",
                letterSpacing: "0.1em",
                marginBottom: 5,
                display: "block",
              }}
            >
              ▶ RESULTS
            </span>
            <p
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "1rem",
                color: "var(--text-primary)",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.results}
            </p>
          </div>
        </div>

        {/* ── Card body ── */}
        <div
          style={{
            padding: "20px 20px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: 14,
          }}
        >
          {/* Tech tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              minHeight: 26,
            }}
          >
            {project.techStack.slice(0, 3).map((tech, i) => {
              const { color, bg } = TAG_PALETTE[i % TAG_PALETTE.length];
              return (
                <span
                  key={tech}
                  style={{
                    fontFamily: "var(--font-vt323), monospace",
                    fontSize: "1rem",
                    color,
                    background: bg,
                    border: `1px solid ${color}`,
                    padding: "2px 8px",
                    letterSpacing: "0.04em",
                    lineHeight: 1.4,
                    whiteSpace: "nowrap",
                  }}
                >
                  {tech}
                </span>
              );
            })}
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: "clamp(0.6rem, 1.5vw, 0.8rem)",
              color: "#fff",
              letterSpacing: "0.03em",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              lineHeight: 1.55,
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              margin: 0,
            }}
          >
            {project.description}
          </p>

          {/* Footer links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingTop: 16,
              borderTop: "2px solid rgba(57,255,20,0.2)",
              flexWrap: "wrap",
            }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="magnetic-btn"
              style={{ fontSize: "0.5rem", padding: "8px 12px" }}
            >
              Case Study →
            </Link>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn-secondary"
                style={{
                  fontFamily: "var(--font-press-start), monospace",
                  fontSize: "0.5rem",
                  padding: "8px 12px",
                  display: "inline-flex",
                  alignItems: "center",
                  border: "2px solid var(--neon-purple)",
                  color: "var(--neon-purple)",
                  background: "transparent",
                  boxShadow: "3px 3px 0 var(--neon-purple)",
                  textDecoration: "none",
                  transition: "transform 0.1s, box-shadow 0.1s",
                  lineHeight: 1,
                }}
                aria-label="GitHub Repository"
              >
                GitHub
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-press-start), monospace",
                  fontSize: "0.5rem",
                  padding: "8px 12px",
                  display: "inline-flex",
                  alignItems: "center",
                  border: "2px solid var(--neon-green)",
                  color: "var(--neon-green)",
                  background: "transparent",
                  boxShadow: "3px 3px 0 var(--neon-green)",
                  textDecoration: "none",
                  transition: "transform 0.1s, box-shadow 0.1s",
                  marginLeft: "auto",
                  lineHeight: 1,
                }}
                aria-label="Live Demo"
              >
                Live ▶
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Hover style for overlay + initial */}
      <style>{`
        .project-card:hover .card-hover-overlay { opacity: 1 !important; }
        .project-card:hover .card-initial       { transform: scale(1.1); }
      `}</style>
    </motion.div>
  );
}
