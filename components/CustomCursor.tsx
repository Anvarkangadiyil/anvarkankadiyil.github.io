"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    // Hide native cursor
    document.body.style.cursor = "none";
    
    // Inject global styles to force custom cursor on interactive elements
    const style = document.createElement("style");
    style.innerHTML = `
      a, button, input, textarea, [role="button"], .interactive-hover {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position offscreen and align correctly
    gsap.set(cursor, { xPercent: 0, yPercent: -50, x: -100, y: -100 });

    // Initialize quickTo for high-performance mouse tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: hoverRef.current ? 1.5 : 1, duration: 0.1 });
    };

    // Event delegation for highly performant, dynamic hover states
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, input, textarea, [role='button'], .interactive-hover");
      if (interactive) {
        if (!hoverRef.current) {
          hoverRef.current = true;
          gsap.to(cursor, {
            scale: 1.5,
            backgroundColor: "var(--neon-cyan)",
            duration: 0.2,
            overwrite: "auto",
          });
        }
      } else {
        if (hoverRef.current) {
          hoverRef.current = false;
          gsap.to(cursor, {
            scale: 1,
            backgroundColor: "var(--neon-green)",
            duration: 0.2,
            overwrite: "auto",
          });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      document.body.style.cursor = "auto";
      style.remove();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{
        backgroundColor: "var(--neon-green)",
      }}
    />
  );
}
