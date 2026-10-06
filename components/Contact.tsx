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
  useReveal(sectionRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const formData = new FormData(formRef.current!);
      const response = await fetch(siteConfig.contactFormEndpoint, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setStatus("success");
        formRef.current?.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else throw new Error();
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const btnLabel = {
    idle: "Send message",
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
              label="contact"
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
            className="reveal card flex flex-col gap-5 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" name="name" label="Name" type="text" placeholder="Jane Doe" autoComplete="name" />
              <Field id="email" name="email" label="Email" type="email" placeholder="jane@company.com" autoComplete="email" />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me a bit about what you're working on…"
                className="form-input resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-primary self-start disabled:opacity-60"
            >
              {btnLabel}
            </button>

            <p role="status" aria-live="polite" className="sr-only">
              {status === "success" && "Message sent successfully."}
              {status === "error" && "Message failed to send."}
            </p>
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
      className="mb-2 block text-sm font-medium text-[var(--color-muted)]"
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
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type: string;
  autoComplete?: string;
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
        className="form-input"
      />
    </div>
  );
}
