"use client";

import { useRef } from "react";
import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { useReveal } from "@/lib/useReveal";
import { siteConfig } from "@/lib/constants";

const BLOGS = [
  {
    title:
      'A Beginner\'s Guide to Error Handling in Rust: Mastering the "?" Operator',
    excerpt:
      "In the world of Rust programming, mastering error handling is key to creating reliable software. One powerful tool in your toolbox is the ? operator...",
    image:
      "https://miro.medium.com/v2/resize:fit:828/format:webp/1*pPHGDT7c4mYvuZVzuCJ74g.jpeg",
    url: "https://medium.com/@anvarkangadiyil/a-beginners-guide-to-error-handling-in-rust-mastering-the-operator-49cdf73003d2",
    date: "2024",
    tag: "RUST",
    index: "01",
  },
  {
    title: "Functions vs. Methods in Rust: What's the Difference?",
    excerpt:
      "Rust is a cool language for writing computer programs. When you're making things in Rust, you'll meet two important ideas: functions and methods...",
    image:
      "https://miro.medium.com/v2/resize:fit:828/format:webp/1*Mx_aUYv8FlZljtpSiwiM5w.jpeg",
    url: "https://medium.com/@anvarkangadiyil/functions-vs-methods-in-rust-whats-the-difference-fdb846278f1f",
    date: "2024",
    tag: "RUST",
    index: "02",
  },
  {
    title:
      "A Comprehensive Systematic Review of Retrieval-Augmented Generation (RAG): Developments, Limitations, and Future Pathways",
    excerpt:
      "A structured systematic review of Retrieval-Augmented Generation (RAG) research from 2020 to 2026, documenting the architectural evolution from retrieve-then-read prototypes to modular agentic pipelines.",
    image: "/images/rag_review_preview.png",
    url: "https://ijetjournal.org/retrieval-augmented-generation-rag/",
    date: "2026",
    tag: "RESEARCH",
    index: "03",
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section id="blog" ref={sectionRef} className="relative">
      <div className="section-container">
        <SectionHeader
          index="04"
          file="writing/"
          title="Writing & research"
          subtitle="Notes on Rust, software engineering and AI systems."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {BLOGS.map((blog) => (
            <a
              key={blog.url}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal card card-hover group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
                <Image
                  src={blog.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="font-mono text-xs text-[var(--color-subtle)]">
                  {blog.date} · {blog.tag.toLowerCase()}
                </p>
                <h3 className="line-clamp-3 font-medium leading-snug tracking-tight">
                  {blog.title}
                </h3>
                <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  {blog.excerpt}
                </p>
                <span className="pt-1 text-sm font-medium text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
                  Read article ↗
                </span>
              </div>
            </a>
          ))}
        </div>

        <a
          href={siteConfig.links.medium}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal mt-8 inline-block text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          More on Medium ↗
        </a>
      </div>
    </section>
  );
}
