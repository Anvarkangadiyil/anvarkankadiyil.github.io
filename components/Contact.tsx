"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/constants";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

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
              delay: i * 0.08,
              ease: "steps(5)",
              scrollTrigger: { trigger: el, start: "top 88%" },
            },
          );
        });
      }
    };
    loadGSAP();
  }, []);

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
    idle: "[ TRANSMIT MESSAGE ]",
    sending: "[ UPLOADING... ]",
    success: "[ TRANSMISSION OK ]",
    error: "[ ERROR — RETRY ]",
  }[status];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "4px solid var(--neon-green)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="section-container relative z-10">
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Header */}
          <h2 className="section-heading reveal-up">
            &gt; GET IN <span className="gradient-text">TOUCH</span>_
          </h2>
          <p
            className="section-subheading reveal-up"
            style={{ marginBottom: "2.5rem" }}
          >
            [ WAITING FOR USER INPUT... ]
          </p>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="reveal-up"
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.25rem",
              }}
              className="grid-cols-1 md:grid-cols-2"
            >
              <Field
                id="contact-name"
                name="name"
                label="NAME"
                placeholder="PLAYER_1"
                type="text"
              />
              <Field
                id="contact-email"
                name="email"
                label="EMAIL"
                placeholder="name@server.com"
                type="email"
              />
            </div>

            <div>
              <Label htmlFor="contact-message">MESSAGE</Label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="INPUT DATA HERE..."
                className="form-input"
                style={{ resize: "none", display: "block", width: "100%" }}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="magnetic-btn magnetic-btn-primary"
              style={{
                width: "100%",
                opacity: status === "sending" ? 0.6 : 1,
                background:
                  status === "success"
                    ? "var(--neon-green)"
                    : status === "error"
                      ? "#ff2d78"
                      : undefined,
              }}
            >
              {btnLabel}
            </button>
          </form>

          {/* Divider */}
          <div
            className="reveal-up"
            style={{
              margin: "2.5rem 0",
              height: 4,
              background:
                "repeating-linear-gradient(90deg, var(--neon-purple) 0 8px, transparent 8px 16px)",
              opacity: 0.4,
            }}
          />

          {/* Social / alternate comms */}
          <div
            className="reveal-up"
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <span
              style={{
                fontFamily: "var(--font-press-start), monospace",
                fontSize: "0.55rem",
                color: "var(--neon-purple)",
                letterSpacing: "0.1em",
              }}
            >
              {`// ALTERNATE COMMS`}
            </span>

            <a
              href={`mailto:${siteConfig.email}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "1.3rem",
                color: "#fff",
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--neon-cyan)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
            >
              <span
                style={{
                  fontFamily: "var(--font-press-start), monospace",
                  fontSize: "0.5rem",
                  color: "var(--neon-cyan)",
                }}
              >
                ✉
              </span>
              {siteConfig.email}
            </a>

            {/* Social links if available */}
            {siteConfig.links?.github && (
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: "1.3rem",
                  color: "#fff",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--neon-green)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
              >
                <span
                  style={{
                    fontFamily: "var(--font-press-start), monospace",
                    fontSize: "0.5rem",
                    color: "var(--neon-green)",
                  }}
                >
                  ▸
                </span>
                GITHUB
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

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
      style={{
        display: "block",
        fontFamily: "var(--font-press-start), monospace",
        fontSize: "0.55rem",
        color: "var(--neon-cyan)",
        marginBottom: "0.5rem",
        letterSpacing: "0.08em",
      }}
    >
      &gt; {children}:
    </label>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type: string;
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
        className="form-input"
        style={{ display: "block", width: "100%" }}
      />
    </div>
  );
}
