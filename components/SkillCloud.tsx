"use client";

import { useEffect, useRef, useMemo } from "react";
import { skills } from "@/lib/skills";

const CAT_COLOR: Record<string, string> = {
  language: "var(--neon-cyan)",
  framework: "var(--neon-green)",
  tool: "var(--neon-purple)",
  platform: "#ff6b08",
};

interface Particle {
  name: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityDir: number;
}

export default function SkillCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -999, y: -999 });

  const skillList = useMemo(() => skills, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const font = new FontFace(
      "Press Start 2P",
      "url(https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2)",
    );
    font.load().then((f) => document.fonts.add(f));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const init = () => {
      const W = canvas.width;
      const H = canvas.height;
      particles.current = skillList.map((s) => ({
        name: s.name,
        color: CAT_COLOR[s.category] ?? "#00ff41",
        x: 80 + Math.random() * (W - 160),
        y: 40 + Math.random() * (H - 80),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() > 0.5 ? 10 : 9,
        opacity: 0.4 + Math.random() * 0.5,
        opacityDir: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    const resolveColor = (cssVar: string) => {
      if (!cssVar.startsWith("var(")) return cssVar;
      const name = cssVar.slice(4, -1);
      return (
        getComputedStyle(document.documentElement)
          .getPropertyValue(name)
          .trim() || "#fff"
      );
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 60 || p.x > W - 60) p.vx *= -1;
        if (p.y < 20 || p.y > H - 20) p.vy *= -1;

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100;
          p.vx += (dx / dist) * force * 0.08;
          p.vy += (dy / dist) * force * 0.08;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 2.5) {
            p.vx = (p.vx / speed) * 2.5;
            p.vy = (p.vy / speed) * 2.5;
          }
        } else {
          p.vx *= 0.998;
          p.vy *= 0.998;
          if (Math.abs(p.vx) < 0.08) p.vx += (Math.random() - 0.5) * 0.02;
          if (Math.abs(p.vy) < 0.08) p.vy += (Math.random() - 0.5) * 0.02;
        }

        p.opacity += p.opacityDir * 0.003;
        if (p.opacity > 0.92) p.opacityDir = -1;
        if (p.opacity < 0.25) p.opacityDir = 1;

        const col = resolveColor(p.color);
        const hovered = dist < 60;

        ctx.save();
        ctx.globalAlpha = hovered ? 1 : p.opacity;
        ctx.font = `${hovered ? p.size + 2 : p.size}px "Press Start 2P", monospace`;
        ctx.fillStyle = hovered ? "#fff" : col;
        ctx.shadowColor = col;
        ctx.shadowBlur = hovered ? 18 : 6;
        ctx.imageSmoothingEnabled = false;
        ctx.fillText(p.name, p.x, p.y);

        if (hovered) {
          const w = ctx.measureText(p.name).width;
          ctx.fillStyle = col;
          ctx.shadowBlur = 8;
          ctx.fillRect(p.x, p.y + 4, w, 2);
        }

        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    resize();
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [skillList]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        background: "transparent",
        cursor: "none",
      }}
    />
  );
}
