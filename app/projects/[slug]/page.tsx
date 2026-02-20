import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-end pb-20 px-6 bg-[var(--bg-secondary)] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-30 blur-sm scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1200px] w-full mx-auto">
          <Link
            href="/#projects"
            className="inline-flex items-center text-sm text-[var(--neon-cyan)] hover:underline mb-6 group"
          >
            ← Back to Projects
          </Link>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-4 mb-8">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {project.github && (
              <MagneticButton
                href={project.github}
                // @ts-ignore
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn-primary"
              >
                View Code
              </MagneticButton>
            )}
            {project.demo && (
              <MagneticButton
                href={project.demo}
                // @ts-ignore
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn-secondary"
              >
                Live Demo
              </MagneticButton>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-6 mt-20 space-y-20">
        <div className="grid md:grid-cols-[200px_1fr] gap-10">
          <h2 className="text-xl font-bold text-[var(--text-secondary)]">
            The Problem
          </h2>
          <p className="text-lg leading-relaxed text-[var(--text-primary)]">
            {project.problem}
          </p>
        </div>

        <div className="grid md:grid-cols-[200px_1fr] gap-10">
          <h2 className="text-xl font-bold text-[var(--text-secondary)]">
            The Solution
          </h2>
          <p className="text-lg leading-relaxed text-[var(--text-primary)]">
            {project.solution}
          </p>
        </div>

        <div className="grid md:grid-cols-[200px_1fr] gap-10">
          <h2 className="text-xl font-bold text-[var(--text-secondary)]">
            The Results
          </h2>
          <p className="text-lg leading-relaxed text-[var(--text-primary)]">
            {project.results}
          </p>
        </div>

        {/* Screenshots Placeholder */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-8">Screenshots</h2>
          <div className="glass p-4 rounded-xl">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-[var(--bg-secondary)]">
              <Image
                src={project.image}
                alt={`${project.title} Screenshot`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-center text-sm text-[var(--text-secondary)] mt-4">
              Main Application Interface
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
