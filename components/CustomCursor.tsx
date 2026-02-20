"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.05,
          ease: "none",
        });
      }
    };

    const onMouseDown = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
      }
    };

    const onMouseUp = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.1 });
      }
    };

    const onMouseEnterLink = () => setIsHovering(true);
    const onMouseLeaveLink = () => setIsHovering(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const links = document.querySelectorAll("a, button, input, textarea");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const newLinks = node.querySelectorAll(
              "a, button, input, textarea",
            );
            newLinks.forEach((link) => {
              link.addEventListener("mouseenter", onMouseEnterLink);
              link.addEventListener("mouseleave", onMouseLeaveLink);
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor fixed top-0 left-0 pointer-events-none z-[99999] transition-transform ${
        isHovering ? "scale-150" : "scale-100"
      }`}
      style={{
        borderTopColor: isHovering ? "var(--neon-green)" : "var(--neon-cyan)",
        borderLeftColor: isHovering ? "var(--neon-green)" : "var(--neon-cyan)",
      }}
    />
  );
}
