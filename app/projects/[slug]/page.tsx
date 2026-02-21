import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

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

// ── Shared style helpers ──────────────────────────────────────────────────────
const PX = (size = "0.55rem", color = "#fff"): React.CSSProperties => ({
  fontFamily: "var(--font-press-start), monospace",
  fontSize: size,
  color,
  letterSpacing: "0.06em",
  lineHeight: 1.8,
});

const VT = (color = "var(--text-secondary)"): React.CSSProperties => ({
  fontFamily: "var(--font-vt323), monospace",
  fontSize: "1.2rem",
  color,
  lineHeight: 1.7,
  letterSpacing: "0.03em",
});

// ── Sub-components ────────────────────────────────────────────────────────────
function SectionBlock({
  index,
  label,
  children,
  color = "var(--neon-cyan)",
}: {
  index: string;
  label: string;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "160px 1fr",
        gap: "1.5rem",
        borderLeft: `4px solid ${color}`,
        paddingLeft: "1.25rem",
      }}
      className="grid-cols-1 md:grid-cols-[160px_1fr]"
    >
      {/* Label column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ ...PX("0.45rem", color) }}>{index}</span>
        <span style={{ ...PX("0.55rem", "#fff") }}>{label}</span>
      </div>
      {/* Content */}
      <p style={VT()}>{children}</p>
    </div>
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
    <article
      style={{
        minHeight: "100vh",
        paddingBottom: "5rem",
        background: "var(--bg-primary)",
      }}
    >
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "55vh",
          minHeight: 320,
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
          borderBottom: "4px solid var(--neon-green)",
        }}
      >
        {/* Blurred bg image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            style={{
              opacity: 0.2,
              filter: "blur(4px) contrast(1.2)",
              transform: "scale(1.08)",
            }}
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, var(--bg-primary) 30%, transparent 100%)",
            }}
          />
        </div>

        {/* Scanlines overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1200,
            width: "100%",
            margin: "0 auto",
            padding: "0 1.5rem 2.5rem",
          }}
        >
          {/* Back link */}
          <Link
            href="/#projects"
            style={{
              ...PX("0.5rem", "var(--neon-cyan)"),
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: "1.25rem",
            }}
          >
            ◀ BACK
          </Link>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: "clamp(1rem, 3.5vw, 2rem)",
              color: "#fff",
              textShadow: "4px 4px 0 var(--neon-purple)",
              marginBottom: "1.25rem",
              lineHeight: 1.4,
              textTransform: "uppercase",
            }}
          >
            {project.title}
          </h1>

          {/* Tech badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: "1.5rem",
            }}
          >
            {project.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  ...PX("0.45rem", "var(--neon-green)"),
                  background: "#000",
                  border: "2px solid var(--neon-green)",
                  padding: "4px 10px",
                  boxShadow: "3px 3px 0 var(--neon-green)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn magnetic-btn-primary"
              >
                ▶ VIEW CODE
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn magnetic-btn-secondary"
              >
                ▶ LIVE DEMO
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "4rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
        }}
      >
        {/* Pixel section divider label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ ...PX("0.5rem", "var(--neon-cyan)") }}>
            &gt; PROJECT.INFO
          </span>
          <div
            style={{
              flex: 1,
              height: 3,
              background:
                "repeating-linear-gradient(90deg, var(--neon-cyan) 0 6px, transparent 6px 12px)",
              opacity: 0.3,
            }}
          />
        </div>

        {/* Problem / Solution / Results */}
        <SectionBlock index="01" label="THE PROBLEM" color="var(--neon-cyan)">
          {project.problem}
        </SectionBlock>

        <SectionBlock index="02" label="THE SOLUTION" color="var(--neon-green)">
          {project.solution}
        </SectionBlock>

        <SectionBlock index="03" label="THE RESULTS" color="var(--neon-purple)">
          {project.results}
        </SectionBlock>

        {/* Screenshot */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: "1rem",
            }}
          >
            <span style={{ ...PX("0.5rem", "var(--neon-cyan)") }}>
              &gt; SCREENSHOT
            </span>
            <div
              style={{
                flex: 1,
                height: 3,
                background:
                  "repeating-linear-gradient(90deg, var(--neon-cyan) 0 6px, transparent 6px 12px)",
                opacity: 0.3,
              }}
            />
          </div>

          <div
            style={{
              background: "#000",
              border: "4px solid var(--neon-green)",
              boxShadow: "8px 8px 0 var(--neon-cyan)",
              padding: 8,
            }}
          >
            {/* Fake window bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderBottom: "3px solid var(--neon-green)",
                paddingBottom: 6,
                marginBottom: 8,
              }}
            >
              {[
                "var(--neon-green)",
                "var(--neon-cyan)",
                "var(--neon-purple)",
              ].map((c, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    width: 10,
                    height: 10,
                    background: c,
                    border: `2px solid ${c}`,
                  }}
                />
              ))}
              <span style={{ ...PX("0.4rem", "#555"), marginLeft: 8 }}>
                {project.title.toUpperCase()}.PNG
              </span>
            </div>

            <div
              style={{
                position: "relative",
                aspectRatio: "16/9",
                overflow: "hidden",
              }}
            >
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                style={{ objectFit: "cover", imageRendering: "pixelated" }}
              />
              {/* Scanline overlay on image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
                }}
              />
            </div>

            <p
              style={{
                ...VT("#555"),
                fontSize: "0.9rem",
                marginTop: 6,
                textAlign: "center",
              }}
            >
              MAIN APPLICATION INTERFACE
            </p>
          </div>
        </div>

        {/* Back button */}
        <div>
          <Link href="/#projects" className="magnetic-btn">
            ◀ BACK TO PROJECTS
          </Link>
        </div>
      </div>
    </article>
  );
}
