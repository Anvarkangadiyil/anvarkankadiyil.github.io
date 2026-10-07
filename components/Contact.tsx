"use client";

import { useRef, useState } from "react";
import { siteConfig } from "@/lib/constants";
import SectionHeader from "./SectionHeader";
import SocialIcon from "./SocialIcon";
import { useReveal } from "@/lib/useReveal";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  useReveal(sectionRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const formData = new FormData(formRef.current!);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      if (response.ok) {
        setStatus("success");
        formRef.current?.reset();
        setTimeout(() => setStatus("idle"), 5000);
        return;
      }
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        (err instanceof Error && err.message) ||
          "Something went wrong. Please email me directly.",
      );
    }
  };

  const btnLabel = {
    idle: "./send.sh",
    sending: "Sending…",
    success: "Message sent ✓",
    error: "Failed — try again",
  }[status];

  return (
    <section id="contact" ref={sectionRef} className="relative">
      <div className="section-container">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* ── Left ── */}
          <div>
            <SectionHeader
              index="05"
              file="contact.sh"
              title="Let's build something"
              subtitle="Have a project, role or idea in mind? Send a message — I usually reply within a couple of days."
            />

            <div className="reveal -mt-4 space-y-5">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex items-center gap-2 font-mono text-[15px] text-[var(--color-text)]"
              >
                <span className="text-[var(--color-accent)]">&gt;</span>
                <span className="border-b border-[var(--color-border-strong)] transition-colors group-hover:border-[var(--color-accent)]">
                  {siteConfig.email}
                </span>
              </a>

              <div className="flex items-center gap-5">
                {(["github", "linkedin", "medium"] as const).map((key) => (
                  <a
                    key={key}
                    href={siteConfig.links[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="text-[var(--color-subtle)] transition-colors hover:text-[var(--color-text)]"
                  >
                    <SocialIcon name={key} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Form ── */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="reveal card relative flex flex-col gap-5 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" name="name" label="--name" type="text" placeholder="Jane Doe" autoComplete="name" maxLength={100} />
              <Field id="email" name="email" label="--email" type="email" placeholder="jane@company.com" autoComplete="email" maxLength={254} />
            </div>

            <div>
              <Label htmlFor="message">--message</Label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={5000}
                placeholder="Tell me a bit about what you're working on…"
                className="form-input resize-y"
              />
            </div>

            {/* Honeypot for bots — hidden from people and screen readers */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-primary font-mono disabled:opacity-60"
              >
                {btnLabel}
              </button>

              <p role="status" aria-live="polite" className="font-mono text-sm">
                {status === "success" && (
                  <span className="text-[var(--color-accent)]">
                    ✓ delivered — I&apos;ll get back to you soon
                  </span>
                )}
                {status === "error" && (
                  <span className="text-[#f87171]">✗ {errorMsg}</span>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block font-mono text-sm text-[var(--color-muted)]"
    >
      {children}
    </label>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type,
  autoComplete,
  maxLength,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type: string;
  autoComplete?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        type={type}
        id={id}
        name={name}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        className="form-input"
      />
    </div>
  );
}
