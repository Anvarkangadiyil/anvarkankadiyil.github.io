"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { skills } from "@/lib/skills";

const SkillCloud = dynamic(() => import("./SkillCloud"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="loading-bar w-32">
        <div className="loading-bar-fill" />
      </div>
    </div>
  ),
});

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
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.05,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            },
          );
        });
      }

      // Animate badges
      const badges = sectionRef.current?.querySelectorAll(".skill-badge");
      if (badges) {
        gsap.fromTo(
          badges,
          { y: 20, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.04,
            scrollTrigger: {
              trigger: badges[0],
              start: "top 85%",
            },
          },
        );
      }
    };
    loadGSAP();
  }, []);

  const categoryColors: Record<string, string> = {
    language: "var(--neon-cyan)",
    framework: "var(--neon-purple)",
    tool: "var(--neon-green)",
    platform: "var(--neon-blue)",
  };

  return (
    <section id="skills" ref={sectionRef} className="relative">
      <div className="section-container">
        <div className="text-center mb-8">
          <h2 className="section-heading reveal-up">
            &gt; SKILLS &amp; <span className="gradient-text">TECH</span>_
          </h2>
          <p className="section-subheading mx-auto reveal-up">
            [ HOVER TO INTERACT ]
          </p>
        </div>

        {/* 3D Skill Cloud */}
        <div
          className="w-full h-[400px] md:h-[500px] mb-12 border-4 border-[var(--neon-blue)] bg-[#000]"
          style={{ boxShadow: "8px 8px 0px var(--neon-blue)" }}
        >
          <SkillCloud />
        </div>

        {/* Skill Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-badge"
              style={{
                borderColor: categoryColors[skill.category],
              }}
            >
              <span
                className="w-2 h-2"
                style={{ backgroundColor: categoryColors[skill.category] }}
              />
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
