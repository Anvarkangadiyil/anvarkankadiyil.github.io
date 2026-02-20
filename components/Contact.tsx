"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/constants";

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setIsMounted(true);
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
              },
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
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[var(--bg-secondary)] py-20 border-t-4 border-[var(--neon-green)]"
    >
      {/* Background blocks (CSS) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isMounted &&
          Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-[var(--neon-cyan)]"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.15 + 0.05,
                animation: `float-particle ${Math.random() * 10 + 10}s steps(10) infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        <style jsx>{`
          @keyframes float-particle {
            0%,
            100% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(20px, -30px);
            }
            50% {
              transform: translate(-15px, 20px);
            }
            75% {
              transform: translate(25px, 10px);
            }
          }
        `}</style>
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="section-heading reveal-up">
            &gt; GET IN <span className="gradient-text">TOUCH</span>_
          </h2>
          <p className="section-subheading mx-auto mb-12 reveal-up uppercase mt-4">
            [ WAITING FOR USER INPUT... ] Let&apos;s build something.
          </p>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 text-left reveal-up"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xl text-[var(--neon-cyan)] mb-2 uppercase"
                >
                  &gt; NAME:
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  placeholder="PLAYER 1"
                  className="form-input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xl text-[var(--neon-cyan)] mb-2 uppercase"
                >
                  &gt; EMAIL:
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  placeholder="name@server.com"
                  className="form-input"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="block text-xl text-[var(--neon-cyan)] mb-2 uppercase"
              >
                &gt; MESSAGE_
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="INPUT DATA HERE..."
                className="form-input resize-none"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={status === "sending"}
                className="magnetic-btn magnetic-btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending"
                  ? "[ UPLOADING... ]"
                  : status === "success"
                    ? "[ TRANSMISSION SUCCESS ]"
                    : status === "error"
                      ? "[ SYSTEM ERROR - RETRY ]"
                      : "[ TRANSMIT MESSAGE ]"}
              </button>
            </div>
          </form>

          {/* Social Links */}
          <div className="mt-16 reveal-up">
            <p className="text-[var(--neon-purple)] text-xl mb-4 uppercase">
              // ALTERNATE COMMS PROTOCOL
            </p>
            <div className="flex items-center justify-center gap-6">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-white text-xl hover:text-[var(--neon-cyan)] transition-colors uppercase"
              >
                [ EMAIL ] {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
