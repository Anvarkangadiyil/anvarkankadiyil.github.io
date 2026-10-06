"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Only on precise pointers and when motion is welcome
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    const xTo = gsap.quickTo(button, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(button, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      xTo((e.clientX - (left + width / 2)) * 0.15);
      yTo((e.clientY - (top + height / 2)) * 0.15);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const Component = href ? "a" : "button";

  return (
    <Component
      ref={buttonRef as any}
      className={`btn ${className}`}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </Component>
  );
}
