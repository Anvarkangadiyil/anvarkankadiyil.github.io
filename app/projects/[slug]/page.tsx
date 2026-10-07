import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import ProjectPreview from "@/components/ProjectPreview";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

// ── Sub-components ────────────────────────────────────────────────────────────
function SectionBlock({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-2 border-t border-[var(--color-border)] pt-8 md:grid-cols-[180px_1fr] md:gap-8">
      <div>
        <p className="font-mono text-xs text-[var(--color-accent)]">{index}</p>
        <h2 className="mt-1 font-medium tracking-tight">{label}</h2>
      </div>
      <p className="text-lg leading-relaxed text-[var(--color-muted)]">
        {children}
      </p>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-[880px] px-4 pb-24 pt-28 sm:px-6">
      {/* ── Header ── */}
      <Link
        href="/#projects"
        className="font-mono text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
      >
        <span className="text-[var(--color-accent)]">cd</span> ../projects
      </Link>

      <h1 className="mt-6 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
        {project.title}
      </h1>

      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>

      {(project.github || project.demo) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Live demo ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              View code ↗
            </a>
          )}
        </div>
      )}

      {/* ── Preview ── */}
      <div className="mt-12">
        <ProjectPreview
          url={project.demo}
          image={project.image}
          title={project.title}
          github={project.github}
          aspectRatio="16/10"
        />
      </div>

      {/* ── Problem / Solution / Results ── */}
      <div className="mt-16 flex flex-col gap-10">
        <SectionBlock index="01" label="The problem">
          {project.problem}
        </SectionBlock>
        <SectionBlock index="02" label="The solution">
          {project.solution}
        </SectionBlock>
        <SectionBlock index="03" label="The results">
          {project.results}
        </SectionBlock>
      </div>

      <div className="mt-16 border-t border-[var(--color-border)] pt-8">
        <Link href="/#projects" className="btn btn-secondary">
          ← Back to all projects
        </Link>
      </div>
    </article>
  );
}
