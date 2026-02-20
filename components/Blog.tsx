"use client";

export default function Blog() {
  const blogs = [
    {
      title:
        'A Beginner\'s Guide to Error Handling in Rust: Mastering the "?" Operator',
      excerpt:
        "In the world of Rust programming, mastering error handling is key to creating reliable software. One powerful tool in your toolbox is the ? operator...",
      image:
        "https://miro.medium.com/v2/resize:fit:828/format:webp/1*pPHGDT7c4mYvuZVzuCJ74g.jpeg",
      url: "https://medium.com/@anvarkangadiyil/a-beginners-guide-to-error-handling-in-rust-mastering-the-operator-49cdf73003d2",
      date: "2024",
    },
    {
      title: "Functions vs. Methods in Rust: What's the Difference?",
      excerpt:
        "Rust is a cool language for writing computer programs. When you're making things in Rust, you'll meet two important ideas: functions and methods...",
      image:
        "https://miro.medium.com/v2/resize:fit:828/format:webp/1*Mx_aUYv8FlZljtpSiwiM5w.jpeg",
      url: "https://medium.com/@anvarkangadiyil/functions-vs-methods-in-rust-whats-the-difference-fdb846278f1f",
      date: "2024",
    },
  ];

  return (
    <section id="blog" className="relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            &gt; LATEST <span className="gradient-text">DATA LOGS</span>_
          </h2>
          <p className="section-subheading mx-auto uppercase">
            [ Sharing insights on software development. ]
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {blogs.map((blog) => (
            <a
              key={blog.url}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group block"
            >
              <div className="aspect-video overflow-hidden border-b-4 border-[var(--neon-blue)]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{
                    imageRendering: "pixelated",
                    filter: "contrast(1.2)",
                  }}
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="text-xs text-[var(--neon-cyan)] font-medium tracking-wider uppercase">
                  [{blog.date}] &bull; Medium
                </span>
                <h3
                  className="text-lg font-bold mt-2 mb-3 text-white group-hover:text-[var(--neon-cyan)] transition-colors line-clamp-2 uppercase"
                  style={{ fontFamily: "var(--font-press-start)" }}
                >
                  {blog.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2 uppercase">
                  {blog.excerpt}
                </p>
                <span className="inline-block mt-4 text-sm text-[var(--neon-green)] font-medium uppercase font-bold">
                  [ EXECUTE READ_LOG ] →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
