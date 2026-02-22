"use client";

import { STACK, STATS, TIMELINE } from "@/lib/experience";
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
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              delay: i * 0.07,
              ease: "steps(5)",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
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
        <div
          className="flex flex-col justify-center items-center mb-10"
          style={{
            marginBottom: "2.5rem",
            textAlign: "center",
          }}
        >
          <h2 className="section-heading reveal-up">
            &gt; ABOUT <span className="gradient-text">ME</span>_
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start mt-8">
          {/* ── LEFT ── */}
          <div className="reveal-up flex flex-col items-center gap-8">
            {/* Photo */}
            <div
              style={{
                position: "relative",
                width: 260,
                height: 260,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "4px solid var(--neon-green)",
                  boxShadow: "10px 10px 0 var(--neon-cyan)",
                  background: "#111",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 10,
                  border: "2px solid var(--neon-purple)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 20,
                  border: "3px solid #fff",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/images/anvar.jpg"
                  alt="Anvar Kangadiyil"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    imageRendering: "pixelated",
                    filter: "contrast(1.15)",
                  }}
                />
              </div>
              {["top-left", "top-right", "bottom-left", "bottom-right"].map(
                (c) => {
                  const [v, h] = c.split("-");
                  return (
                    <div
                      key={c}
                      style={{
                        position: "absolute",
                        [v]: -8,
                        [h]: -8,
                        width: 14,
                        height: 14,
                        background: "var(--neon-cyan)",
                      }}
                    />
                  );
                },
              )}
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 10,
                width: "100%",
                maxWidth: 280,
              }}
            >
              {STATS.map(({ val, label }) => (
                <div
                  key={label}
                  style={{
                    background: "#000",
                    border: "3px solid var(--neon-green)",
                    boxShadow: "4px 4px 0 var(--neon-green)",
                    padding: "10px 4px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-press-start), monospace",
                      fontSize: "0.8rem",
                      color: "var(--neon-green)",
                      textShadow: "0 0 8px var(--neon-green)",
                      marginBottom: 4,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-vt323), monospace",
                      fontSize: "0.85rem",
                      color: "#666",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Stack tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                justifyContent: "center",
              }}
            >
              {STACK.map(({ name, color }) => (
                <span
                  key={name}
                  style={{
                    fontFamily: "var(--font-press-start), monospace",
                    fontSize: "0.5rem",
                    color,
                    background: "#000",
                    border: `2px solid ${color}`,
                    padding: "5px 10px",
                    boxShadow: `3px 3px 0 ${color}44`,
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Bio card */}
            <div
              className="reveal-up"
              style={{
                background: "#000",
                border: "3px solid var(--neon-cyan)",
                boxShadow: "6px 6px 0 var(--neon-cyan)",
                padding: "1.25rem",
              }}
            >
              <div
                style={{
                  borderBottom: "2px solid var(--neon-cyan)",
                  paddingBottom: 8,
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-press-start), monospace",
                    fontSize: "0.45rem",
                    color: "var(--neon-cyan)",
                  }}
                >
                  BIO.TXT
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background:
                      "repeating-linear-gradient(90deg, var(--neon-cyan) 0 4px, transparent 4px 8px)",
                    opacity: 0.3,
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: "1.2rem",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  marginBottom: 10,
                }}
              >
                &gt; Hey! I&apos;m{" "}
                <span style={{ color: "#fff" }}>Anvar Kangadiyil</span> — a
                passionate developer turning complex ideas into elegant,
                performant digital experiences.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: "1.2rem",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                }}
              >
                &gt; Obsessed with clean code, open source, and building tech
                that actually matters.
              </p>
            </div>

            {/* Timeline */}
            <div className="reveal-up">
              <h3
                style={{
                  fontFamily: "var(--font-press-start), monospace",
                  fontSize: "clamp(0.6rem, 1.4vw, 0.8rem)",
                  color: "#fff",
                  marginBottom: "1.25rem",
                  lineHeight: 1.5,
                }}
              >
                &gt; EXPERIENCE_
              </h3>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {TIMELINE.map((item, i) => (
                  <div
                    key={i}
                    className="reveal-up"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "44px 1fr",
                      gap: "0 14px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          flexShrink: 0,
                          background: "#000",
                          border: `3px solid ${item.color}`,
                          boxShadow: `3px 3px 0 ${item.color}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-press-start), monospace",
                            fontSize: "0.45rem",
                            color: item.color,
                          }}
                        >
                          {item.index}
                        </span>
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div
                          style={{
                            flex: 1,
                            width: 3,
                            marginTop: 3,
                            minHeight: 28,
                            background: `repeating-linear-gradient(to bottom, ${item.color} 0 5px, transparent 5px 10px)`,
                            opacity: 0.3,
                          }}
                        />
                      )}
                    </div>

                    <div
                      style={{
                        paddingBottom: i < TIMELINE.length - 1 ? 28 : 0,
                        paddingTop: 4,
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: "var(--font-press-start), monospace",
                          fontSize: "clamp(0.48rem, 1.2vw, 0.65rem)",
                          color: "#fff",
                          lineHeight: 1.6,
                          marginBottom: 3,
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "var(--font-vt323), monospace",
                          fontSize: "1rem",
                          color: item.color,
                          letterSpacing: "0.04em",
                          marginBottom: 5,
                        }}
                      >
                        {item.sub} &bull; {item.period}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-vt323), monospace",
                          fontSize: "1rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
