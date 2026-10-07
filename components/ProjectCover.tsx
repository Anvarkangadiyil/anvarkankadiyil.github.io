import Image from "next/image";
import { Project } from "@/lib/projects";

/** Screenshot for a project, or a generated terminal-style cover when none exists. */
export default function ProjectCover({
  project,
  sizes,
  priority = false,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
}) {
  const hasImage = !project.image.endsWith("placeholder.svg");

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
      {hasImage ? (
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="hero-bg [mask-image:none]" />
          <p className="relative font-mono text-sm text-[var(--color-subtle)]">
            <span className="text-[var(--color-accent)]">$</span> open{" "}
            {project.slug}
          </p>
          <p className="relative mt-1 text-2xl font-semibold tracking-tight text-[var(--color-text)]">
            {project.title.split(" — ")[0]}
            <span className="cursor-blink">_</span>
          </p>
        </div>
      )}
    </div>
  );
}
