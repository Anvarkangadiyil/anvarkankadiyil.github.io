"use client";

import { STACK, STATS, TIMELINE } from "@/lib/experience";
import { useRef } from "react";
import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { useReveal } from "@/lib/useReveal";
import { siteConfig } from "@/lib/constants";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="relative">
      <div className="section-container">
        <SectionHeader index="01" label="about" title="About me" />

        <div className="grid items-start gap-14 md:grid-cols-[280px_1fr] lg:gap-20">
          {/* ── LEFT ── */}
          <div className="reveal flex flex-col gap-6">
            <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
              <Image
                src="/images/anvar.jpg"
                alt={siteConfig.name}
                fill
                sizes="280px"
                className="object-cover"
                priority={false}
              />
            </div>

            <dl className="grid max-w-[280px] grid-cols-3 gap-2">
              {STATS.map(({ val, label }) => (
                <div
                  key={label}
                  className="card px-2 py-3 text-center"
                >
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-xl font-semibold tracking-tight">
                    {val}
                  </dd>
                  <dd className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-[var(--color-subtle)]">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── RIGHT ── */}
          <div className="flex flex-col gap-12">
            <div className="reveal space-y-4 text-lg leading-relaxed text-[var(--color-muted)]">
              <p>
                Hey! I&apos;m{" "}
                <span className="text-[var(--color-text)]">
                  {siteConfig.name}
                </span>{" "}
                — a developer who enjoys turning complex ideas into elegant,
                performant digital experiences.
              </p>
              <p>
                I care about clean code, open source, and building tech that
                actually matters.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {STACK.map(({ name }) => (
                  <span key={name} className="chip">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="reveal">
              <h3 className="mb-6 font-mono text-sm text-[var(--color-subtle)]">
                <span className="text-[var(--color-accent)]">&gt;</span>{" "}
                experience &amp; education
              </h3>

              <ol className="relative border-l border-[var(--color-border)]">
                {TIMELINE.map((item, i) => (
                  <li
                    key={item.index}
                    className={`relative pl-7 ${i < TIMELINE.length - 1 ? "pb-9" : ""}`}
                  >
                    <span
                      className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border ${
                        i === 0
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                          : "border-[var(--color-border-strong)] bg-[var(--color-bg)]"
                      }`}
                    />
                    <p className="font-mono text-xs text-[var(--color-subtle)]">
                      {item.period}
                    </p>
                    <h4 className="mt-1 text-lg font-medium tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-[15px] text-[var(--color-muted)]">
                      {item.sub}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
