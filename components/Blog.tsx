"use client";

import Image from "next/image";

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
];

export default function Blog() {
  return (
    <section id="blog" className="relative">
      <div className="section-container">
        {/* Header */}
        <div className="flex justify-center items-center flex-col">
          <h2 className="section-heading">
            &gt; LATEST <span className="gradient-text">DATA LOGS</span>_
          </h2>
          <p
            className="section-subheading mx-auto text-center"
            style={{
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            [ SHARING INSIGHTS ON SOFTWARE DEV ]
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {BLOGS.map((blog) => (
            <a
              key={blog.url}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "block" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translate(2px, 2px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "4px 4px 0 var(--neon-cyan)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "6px 6px 0 var(--neon-cyan)";
              }}
            >
              <article
                style={{
                  background: "#000",
                  border: "4px solid var(--neon-cyan)",
                  boxShadow: "6px 6px 0 var(--neon-cyan)",
                  transition:
                    "transform 0.05s steps(1), box-shadow 0.05s steps(1)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16/9",
                    overflow: "hidden",
                    borderBottom: "4px solid var(--neon-cyan)",
                  }}
                >
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    style={{
                      objectFit: "cover",
                      filter: "contrast(1.15) grayscale(0.2)",
                      display: "block",
                    }}
                  />
                  {/* Scanline overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background:
                        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)",
                    }}
                  />
                  {/* Index badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      background: "#000",
                      border: "2px solid var(--neon-cyan)",
                      padding: "3px 8px",
                      fontFamily: "var(--font-press-start), monospace",
                      fontSize: "0.45rem",
                      color: "var(--neon-cyan)",
                    }}
                  >
                    LOG_{blog.index}
                  </div>
                  {/* Tag badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: "var(--neon-green)",
                      padding: "3px 8px",
                      fontFamily: "var(--font-press-start), monospace",
                      fontSize: "0.4rem",
                      color: "#000",
                    }}
                  >
                    {blog.tag}
                  </div>
                </div>

                {/* Body */}
                <div
                  style={{
                    padding: "1rem 1.25rem 1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  {/* Meta */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-press-start), monospace",
                        fontSize: "0.4rem",
                        color: "var(--neon-purple)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {blog.date}
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        width: 3,
                        height: 3,
                        background: "var(--neon-purple)",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-press-start), monospace",
                        fontSize: "0.4rem",
                        color: "var(--neon-purple)",
                      }}
                    >
                      MEDIUM
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-press-start), monospace",
                      fontSize: "clamp(0.5rem, 1.3vw, 0.65rem)",
                      color: "#fff",
                      lineHeight: 1.7,
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontFamily: "var(--font-vt323), monospace",
                      fontSize: "1.05rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {blog.excerpt}
                  </p>

                  {/* CTA */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      borderTop: "2px solid #111",
                      paddingTop: 10,
                      marginTop: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-press-start), monospace",
                        fontSize: "0.45rem",
                        color: "var(--neon-green)",
                        textShadow: "0 0 8px var(--neon-green)",
                      }}
                    >
                      ▶ READ LOG
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: 2,
                        background:
                          "repeating-linear-gradient(90deg, var(--neon-green) 0 4px, transparent 4px 8px)",
                        opacity: 0.3,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-press-start), monospace",
                        fontSize: "0.4rem",
                        color: "#444",
                      }}
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
