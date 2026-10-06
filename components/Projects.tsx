"use client";

import { useRef, useState } from "react";
import { projects, Project, ProjectCategory } from "@/lib/projects";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ProjectCover from "./ProjectCover";
import { useReveal } from "@/lib/useReveal";

const categories: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Mobile", value: "mobile" },
  { label: "AI", value: "ai" },
  { label: "Open Source", value: "opensource" },
];

export default function Projects() {
  const [active, setActive] = useState<string>("all");
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category.includes(active as ProjectCategory));

  return (
    <section id="projects" ref={sectionRef} className="relative">
      <div className="section-container">
        <SectionHeader
          index="02"
          label="projects"
          title="Selected work"
          subtitle="Things I've designed, built and shipped — from SaaS products to AI tooling and systems experiments."
        />

        {/* ── Category filter ── */}
        <div
          className="reveal mb-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter projects"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={active === cat.value}
              onClick={() => setActive(cat.value)}
              className={`filter-btn ${active === cat.value ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <motion.div layout className="grid gap-6 md:grid-cols-2">
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
                className="col-span-full py-16 text-center font-mono text-sm text-[var(--color-subtle)]"
              >
                &gt; no projects found in this category_
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      className="card card-hover group relative flex flex-col overflow-hidden"
    >
      <ProjectCover project={project} sizes="(max-width: 768px) 100vw, 540px" />

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold tracking-tight">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0"
          >
            {project.title}
          </Link>
        </h3>

        <p className="line-clamp-3 flex-1 text-[15px] leading-relaxed text-[var(--color-muted)]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>

        <div className="relative z-10 mt-2 flex items-center gap-4 border-t border-[var(--color-border)] pt-4 text-sm">
          <Link
            href={`/projects/${project.slug}`}
            className="font-medium text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]"
          >
            Case study →
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              GitHub ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              Live ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
