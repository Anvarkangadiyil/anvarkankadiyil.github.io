"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/constants";
import { projects } from "@/lib/projects";

interface Command {
  id: string;
  group: "Go to" | "Projects" | "Links" | "Actions";
  label: string;
  hint: string;
  keywords?: string;
  run: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const goToSection = useCallback(
    (href: string) => {
      if (pathname === "/") {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", href);
      } else {
        router.push(`/${href}`);
      }
    },
    [pathname, router],
  );

  const commands = useMemo<Command[]>(() => {
    const external = (url: string) => () =>
      window.open(url, "_blank", "noopener,noreferrer");

    return [
      ...navLinks.map((l) => ({
        id: `nav-${l.href}`,
        group: "Go to" as const,
        label: `cd ${l.file}`,
        hint: l.desc,
        keywords: l.label,
        run: () => goToSection(l.href),
      })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: "Projects" as const,
        label: `open ${p.slug}`,
        hint: p.title,
        keywords: `${p.techStack.join(" ")} ${p.category.join(" ")}`,
        run: () => router.push(`/projects/${p.slug}`),
      })),
      {
        id: "resume",
        group: "Links",
        label: "open resume.pdf",
        hint: "view my CV",
        keywords: "cv resume",
        run: external(siteConfig.links.resume),
      },
      {
        id: "github",
        group: "Links",
        label: "open github",
        hint: "@Anvarkangadiyil",
        run: external(siteConfig.links.github),
      },
      {
        id: "linkedin",
        group: "Links",
        label: "open linkedin",
        hint: "connect with me",
        run: external(siteConfig.links.linkedin),
      },
      {
        id: "medium",
        group: "Links",
        label: "open medium",
        hint: "read my articles",
        keywords: "blog writing",
        run: external(siteConfig.links.medium),
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "copy email",
        hint: siteConfig.email,
        keywords: "mail contact",
        run: () => {
          navigator.clipboard?.writeText(siteConfig.email);
          setToast(`copied ${siteConfig.email}`);
        },
      },
      {
        id: "mail",
        group: "Actions",
        label: "mail anvar",
        hint: "open your email app",
        keywords: "email contact hire",
        run: () => (window.location.href = `mailto:${siteConfig.email}`),
      },
    ];
  }, [goToSection, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint} ${c.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  // Global shortcuts: Ctrl/Cmd+K and "/" open, Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        close();
      }
    };
    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  // Keep the highlighted row visible
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${selected}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const runCommand = (cmd: Command | undefined) => {
    if (!cmd) return;
    close();
    // Let the overlay unmount before scrolling/navigating
    requestAnimationFrame(cmd.run);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runCommand(filtered[selected]);
    }
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[2000] flex items-start justify-center bg-black/60 px-4 pt-[10vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onMouseDown={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="card w-full max-w-xl overflow-hidden shadow-2xl shadow-black/60"
              initial={{ y: -8, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4">
                <span className="font-mono text-[var(--color-accent)]">$</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(0);
                  }}
                  onKeyDown={onInputKey}
                  placeholder="type a command or search…"
                  aria-label="Search commands"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-list"
                  aria-activedescendant={
                    filtered[selected] ? `cmd-${filtered[selected].id}` : undefined
                  }
                  className="h-14 min-w-0 flex-1 bg-transparent font-mono text-[15px] text-[var(--color-text)] outline-none placeholder:text-[var(--color-subtle)]"
                />
                <kbd className="kbd">esc</kbd>
              </div>

              <ul
                id="palette-list"
                ref={listRef}
                role="listbox"
                className="max-h-[min(65vh,520px)] overflow-y-auto overscroll-contain p-2"
                data-lenis-prevent
              >
                {filtered.length === 0 && (
                  <li className="px-3 py-8 text-center font-mono text-sm text-[var(--color-subtle)]">
                    command not found: {query}
                  </li>
                )}
                {filtered.map((cmd, i) => {
                  const header = cmd.group !== lastGroup ? cmd.group : null;
                  lastGroup = cmd.group;
                  return (
                    <li key={cmd.id} role="presentation">
                      {header && (
                        <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-[var(--color-subtle)]">
                          {header}
                        </p>
                      )}
                      <button
                        id={`cmd-${cmd.id}`}
                        role="option"
                        aria-selected={i === selected}
                        data-index={i}
                        onMouseMove={() => setSelected(i)}
                        onClick={() => runCommand(cmd)}
                        className={`flex w-full items-center justify-between gap-4 rounded-md px-3 py-2.5 text-left ${
                          i === selected
                            ? "bg-[var(--color-surface-2)] text-[var(--color-text)]"
                            : "text-[var(--color-muted)]"
                        }`}
                      >
                        <span className="font-mono text-sm">
                          <span
                            className={
                              i === selected
                                ? "text-[var(--color-accent)]"
                                : "text-[var(--color-subtle)]"
                            }
                          >
                            ›{" "}
                          </span>
                          {cmd.label}
                        </span>
                        <span className="truncate text-xs text-[var(--color-subtle)]">
                          {cmd.hint}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-4 border-t border-[var(--color-border)] px-4 py-2.5 font-mono text-[11px] text-[var(--color-subtle)]">
                <span>
                  <kbd className="kbd">↑↓</kbd> navigate
                </span>
                <span>
                  <kbd className="kbd">↵</kbd> run
                </span>
                <span className="ml-auto hidden sm:inline">
                  tip: press <kbd className="kbd">/</kbd> anywhere
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copy confirmation */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-12 left-1/2 z-[2001] -translate-x-1/2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 font-mono text-sm"
          >
            <span className="text-[var(--color-accent)]">✓</span> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
