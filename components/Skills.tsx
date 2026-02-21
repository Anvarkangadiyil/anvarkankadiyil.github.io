"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { skills } from "@/lib/skills";

const SkillCloud = dynamic(() => import("./SkillCloud"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <span
        style={{
          fontFamily: "var(--font-press-start), monospace",
          fontSize: "0.55rem",
          color: "var(--neon-green)",
          letterSpacing: "0.15em",
        }}
      >
        LOADING MODULES...
      </span>
      <div className="loading-bar w-48">
        <div className="loading-bar-fill" />
      </div>
    </div>
  ),
});

const categoryColors: Record<string, string> = {
  language: "var(--neon-cyan)",
  framework: "var(--neon-purple)",
  tool: "var(--neon-green)",
  platform: "var(--neon-blue)",
};

const categoryLabels: Record<string, string> = {
  language: "LANG",
  framework: "FRMWK",
  tool: "TOOL",
  platform: "PLTFM",
};

export default function Skills() {
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
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              delay: i * 0.05,
              ease: "steps(5)",
              scrollTrigger: { trigger: el, start: "top 88%" },
            },
          );
        });
      }

      const badges = sectionRef.current?.querySelectorAll(".skill-badge");
      if (badges) {
        gsap.fromTo(
          badges,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.03,
            ease: "steps(3)",
            scrollTrigger: { trigger: badges[0], start: "top 88%" },
          },
        );
      }
    };
    loadGSAP();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative">
      <div className="section-container">
        {/* Header */}
        <div className="flex justify-center items-center flex-col">
          <h2 className="section-heading">
            &gt; SKILLS &amp; <span className="gradient-text">TECH</span>_
          </h2>
          <p
            className="section-subheading mx-auto text-center"
            style={{
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            [ HOVER TO INTERACT ]
          </p>
        </div>

        {/* Skill Cloud */}
        <div
          className="reveal-up w-full"
          style={{
            height: 380,
            background: "#000",
            border: "4px solid var(--neon-cyan)",
            boxShadow: "8px 8px 0 var(--neon-purple)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Corner labels */}
          <span
            style={{
              position: "absolute",
              top: 8,
              left: 12,
              zIndex: 10,
              fontFamily: "var(--font-press-start), monospace",
              fontSize: "0.45rem",
              color: "var(--neon-cyan)",
              opacity: 0.5,
            }}
          >
            SKILL.CLOUD
          </span>
          <span
            style={{
              position: "absolute",
              top: 8,
              right: 12,
              zIndex: 10,
              fontFamily: "var(--font-press-start), monospace",
              fontSize: "0.45rem",
              color: "var(--neon-cyan)",
              opacity: 0.5,
            }}
          >
            {skills.length} NODES
          </span>

          <SkillCloud />
        </div>

        {/* Legend row */}
        <div
          className="reveal-up flex flex-wrap justify-center gap-6"
          style={{ margin: "3rem 0" }}
        >
          {Object.entries(categoryLabels).map(([cat, label]) => (
            <div
              key={cat}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-press-start), monospace",
                fontSize: "0.5rem",
                color: categoryColors[cat],
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  background: categoryColors[cat],
                  boxShadow: `0 0 6px ${categoryColors[cat]}`,
                }}
              />
              {label}
            </div>
          ))}
        </div>

        {/* Skill Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-badge"
              style={{ borderColor: categoryColors[skill.category] }}
            >
              <span
                className="w-2 h-2 flex-shrink-0"
                style={{
                  display: "inline-block",
                  background: categoryColors[skill.category],
                  boxShadow: `0 0 6px ${categoryColors[skill.category]}`,
                }}
              />
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
