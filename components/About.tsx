"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const els = sectionRef.current?.querySelectorAll(".reveal-up");
      if (els) {
        els.forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.1,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      }
    };
    loadGSAP();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative">
      <div className="section-container">
        {/* ── Two-column grid: image left, content right ── */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* ── LEFT: Pixel frame image ── */}
          <div className="reveal-up flex items-center justify-center">
            {/*
              Outer wrapper gives the stacked borders room to breathe.
              w-72/h-72 on mobile, w-80/h-80 on md — keeps it from
              overflowing its column before the grid kicks in.
            */}
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Layer 1 — outermost green border + cyan drop shadow */}
              <div
                className="absolute inset-0 bg-[#111]"
                style={{
                  border: "4px solid var(--neon-green)",
                  boxShadow: "16px 16px 0px 0px var(--neon-cyan)",
                }}
              />

              {/* Layer 2 — inner purple border inset */}
              <div
                className="absolute"
                style={{
                  inset: 12,
                  border: "2px solid var(--neon-purple)",
                  boxShadow: "8px 8px 0px 0px var(--neon-purple)",
                }}
              />

              {/* Layer 3 — photo */}
              <div
                className="absolute overflow-hidden"
                style={{
                  inset: 24,
                  border: "4px solid #fff",
                }}
              >
                <img
                  src="/images/anvar.jpg"
                  alt="Anvar Kangadiyil"
                  className="w-full h-full object-cover"
                  style={{
                    imageRendering: "pixelated",
                    filter: "contrast(1.2)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Bio + timeline ── */}
          <div className="flex flex-col gap-0">
            {/* Section heading */}
            <h2 className="section-heading reveal-up">
              &gt; ABOUT <span className="gradient-text">ME</span>_
            </h2>

            {/* Bio paragraphs */}
            <div className="flex flex-col gap-5">
              <p
                className="reveal-up"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: "1.25rem",
                  lineHeight: 1.7,
                }}
              >
                Hey there! I&apos;m{" "}
                <span style={{ color: "#fff", fontWeight: 600 }}>
                  Anvar Kangadiyil
                </span>
                , a passionate software developer on a mission to build
                meaningful digital experiences. I thrive on turning complex
                ideas into elegant, performant solutions.
              </p>

              <p
                className="reveal-up"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: "1.25rem",
                  lineHeight: 1.7,
                }}
              >
                Ever since I can remember, I&apos;ve been captivated by the
                endless possibilities that coding offers. It&apos;s not just
                about writing lines of code — it&apos;s about solving puzzles,
                bringing ideas to life, and making a tangible impact.
              </p>

              <p
                className="reveal-up"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: "1.25rem",
                  lineHeight: 1.7,
                }}
              >
                I believe technology has the power to change lives, and I&apos;m
                passionate about using my skills across{" "}
                <span style={{ color: "var(--neon-cyan)" }}>Flutter</span>,{" "}
                <span style={{ color: "var(--neon-purple)" }}>React</span>,{" "}
                <span style={{ color: "var(--neon-green)" }}>Rust</span>, and{" "}
                <span style={{ color: "#fff" }}>AI</span> to make a positive
                difference.
              </p>
            </div>

            {/* ── Timeline ── */}
            <div className="mt-10">
              <h3
                className="reveal-up mb-6"
                style={{
                  fontFamily: "var(--font-press-start), monospace",
                  fontSize: "clamp(0.7rem, 1.8vw, 1rem)",
                  color: "#fff",
                  letterSpacing: "0.04em",
                  lineHeight: 1.5,
                }}
              >
                &gt; EXPERIENCE_
              </h3>

              <div className="timeline">
                {/* Item 1 */}
                <div className="timeline-item reveal-up">
                  <h4
                    style={{
                      fontFamily: "var(--font-press-start), monospace",
                      fontSize: "clamp(0.55rem, 1.4vw, 0.75rem)",
                      color: "#fff",
                      letterSpacing: "0.03em",
                      lineHeight: 1.6,
                      marginBottom: 6,
                    }}
                  >
                    Software Developer
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-vt323), monospace",
                      fontSize: "1.1rem",
                      color: "var(--neon-cyan)",
                      letterSpacing: "0.04em",
                      marginBottom: 8,
                    }}
                  >
                    Freelance &bull; 2023 — Present
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-vt323), monospace",
                      fontSize: "1.1rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    Building cross-platform mobile apps and full-stack web
                    applications for clients worldwide.
                  </p>
                </div>

                {/* Item 2 */}
                <div className="timeline-item reveal-up">
                  <h4
                    style={{
                      fontFamily: "var(--font-press-start), monospace",
                      fontSize: "clamp(0.55rem, 1.4vw, 0.75rem)",
                      color: "#fff",
                      letterSpacing: "0.03em",
                      lineHeight: 1.6,
                      marginBottom: 6,
                    }}
                  >
                    B.Sc. Computer Science
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-vt323), monospace",
                      fontSize: "1.1rem",
                      color: "var(--neon-purple)",
                      letterSpacing: "0.04em",
                      marginBottom: 8,
                    }}
                  >
                    Calicut University &bull; 2020 — 2023
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-vt323), monospace",
                      fontSize: "1.1rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    Focused on algorithms, data structures, and software
                    engineering principles.
                  </p>
                </div>

                {/* Item 3 */}
                <div className="timeline-item reveal-up">
                  <h4
                    style={{
                      fontFamily: "var(--font-press-start), monospace",
                      fontSize: "clamp(0.55rem, 1.4vw, 0.75rem)",
                      color: "#fff",
                      letterSpacing: "0.03em",
                      lineHeight: 1.6,
                      marginBottom: 6,
                    }}
                  >
                    Open Source Contributor
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-vt323), monospace",
                      fontSize: "1.1rem",
                      color: "var(--neon-green)",
                      letterSpacing: "0.04em",
                      marginBottom: 8,
                    }}
                  >
                    GitHub &bull; 2022 — Present
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-vt323), monospace",
                      fontSize: "1.1rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    Contributing to Flutter packages, Rust libraries, and web
                    development tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
