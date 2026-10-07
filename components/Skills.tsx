"use client";

import { useRef } from "react";
import { skills, Skill } from "@/lib/skills";
import SectionHeader from "./SectionHeader";
import { useReveal } from "@/lib/useReveal";

const GROUPS: { category: Skill["category"]; label: string; file: string }[] = [
  { category: "language", label: "Languages", file: "languages" },
  { category: "framework", label: "Frameworks & Libraries", file: "frameworks" },
  { category: "platform", label: "Platforms & Data", file: "platforms" },
  { category: "tool", label: "Tools", file: "tools" },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section id="skills" ref={sectionRef} className="relative">
      <div className="section-container">
        <SectionHeader
          index="03"
          file="skills.ts"
          title="Tools of the trade"
          subtitle="The languages, frameworks and platforms I reach for day to day."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {GROUPS.map(({ category, label, file }) => {
            const items = skills.filter((s) => s.category === category);
            return (
              <div key={category} className="reveal card p-6">
                <div className="mb-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-medium tracking-tight">{label}</h3>
                  <span className="font-mono text-xs text-[var(--color-subtle)]">
                    {file}.ts · {items.length}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <li key={skill.name} className="chip text-[13px]">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
