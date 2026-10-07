"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  openPalette,
  useActiveSection,
  useShortcutLabel,
} from "@/lib/useActiveSection";

/** Editor-style status bar pinned to the bottom of the viewport. */
export default function StatusBar() {
  const pathname = usePathname();
  const active = useActiveSection();
  const shortcut = useShortcutLabel();
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Local time in Kerala, so visitors know when I'm likely to reply
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const file =
    pathname === "/"
      ? active.file
      : pathname.startsWith("/projects/")
        ? `projects/${pathname.split("/").pop()}.md`
        : pathname;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[999] flex h-7 items-center justify-between border-t border-[var(--color-border)] bg-[var(--color-surface)] px-3 font-mono text-[11px] text-[var(--color-subtle)]"
      aria-hidden="true"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex items-center gap-1.5 text-[var(--color-accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          main
        </span>
        <span className="truncate text-[var(--color-muted)]">{file}</span>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span className="hidden sm:inline">utf-8</span>
        <span className="hidden sm:inline">{progress}%</span>
        {time && <span className="hidden md:inline">kerala, in · {time} IST</span>}
        <button
          onClick={openPalette}
          tabIndex={-1}
          className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          {shortcut} commands
        </button>
      </div>
    </div>
  );
}
