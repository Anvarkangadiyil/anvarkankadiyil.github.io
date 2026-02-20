"use client";

import { useRef, useMemo, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, TrackballControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/lib/skills";

// ─── Retro palette ────────────────────────────────────────────────────────────
// Phosphor-screen inspired: each category gets a classic CRT colour
const CAT_COLOR: Record<string, string> = {
  language: "#00ff41", // phosphor green
  framework: "#ff6b08", // amber/orange
  tool: "#00d4ff", // cyan-blue
  platform: "#ff2d78", // hot magenta
};

const GRID_COLOR = "#00ff41"; // green for lattice
const STAR_COLOR = "#c8ffd4"; // pale green-white stars

// ─── Pixel star field ─────────────────────────────────────────────────────────
function StarField() {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const count = 420;
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute on a large sphere shell
      const r = 18 + Math.random() * 10;
      const phi = Math.acos(2 * Math.random() - 1);
      const th = Math.random() * Math.PI * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(phi);
      // Pixel-sized — no smooth sizing
      sizes[i] = Math.random() > 0.85 ? 2 : 1;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, []);

  // Occasional "twinkle" via opacity oscillation
  const matRef = useRef<THREE.PointsMaterial>(null);
  useFrame((s) => {
    if (matRef.current) {
      matRef.current.opacity =
        0.65 + Math.sin(s.clock.elapsedTime * 1.4) * 0.15;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        ref={matRef}
        color={STAR_COLOR}
        size={0.08}
        transparent
        opacity={0.7}
        sizeAttenuation={false}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Globe lattice — blocky pixel grid look ───────────────────────────────────
function GlobeLattice({ radius }: { radius: number }) {
  // Low segment count = angular, pixel-art feel
  const rings = useMemo(() => {
    const SEG = 32;
    const lines: THREE.Vector3[][] = [];

    // Latitude bands
    [-60, -30, 0, 30, 60].forEach((lat) => {
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const r2 = radius * Math.sin(phi);
      const y = radius * Math.cos(phi);
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= SEG; i++) {
        const t = (i / SEG) * Math.PI * 2;
        pts.push(new THREE.Vector3(r2 * Math.cos(t), y, r2 * Math.sin(t)));
      }
      lines.push(pts);
    });

    // Longitude meridians
    [0, 30, 60, 90, 120, 150].forEach((lon) => {
      const t = THREE.MathUtils.degToRad(lon);
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= SEG; i++) {
        const phi = (i / SEG) * Math.PI * 2;
        pts.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(t),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(t),
          ),
        );
      }
      lines.push(pts);
    });

    return lines;
  }, [radius]);

  // Slow pulse on the grid opacity
  const matsRef = useRef<THREE.LineBasicMaterial[]>([]);
  useFrame((s) => {
    const pulse = 0.055 + Math.sin(s.clock.elapsedTime * 0.8) * 0.02;
    matsRef.current.forEach((m) => {
      m.opacity = pulse;
    });
  });

  return (
    <group>
      {rings.map((pts, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          // @ts-ignore: <line> element here refers to THREE.Line, not the SVG element
          <line key={i} geometry={geo}>
            <lineBasicMaterial
              ref={(m) => {
                if (m) matsRef.current[i] = m;
              }}
              color={GRID_COLOR}
              transparent
              opacity={0.06}
              depthWrite={false}
            />
          </line>
        );
      })}
    </group>
  );
}

// ─── Scanline CRT overlay (CSS, applied over the canvas) ─────────────────────
const crtStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  @keyframes scanMove {
    0%   { background-position: 0 0; }
    100% { background-position: 0 4px; }
  }
  @keyframes phosphorFlicker {
    0%,100% { opacity: 1; }
    92%     { opacity: 0.96; }
    94%     { opacity: 0.88; }
    96%     { opacity: 0.96; }
  }
  .crt-wrap {
    animation: phosphorFlicker 6s infinite;
  }
  .scanlines {
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.18) 2px,
      rgba(0,0,0,0.18) 4px
    );
    animation: scanMove 0.2s steps(1) infinite;
    pointer-events: none;
  }
  .blink { animation: blink 1.1s step-end infinite; }
`;

// ─── Individual skill word ────────────────────────────────────────────────────
function SkillWord({
  text,
  position,
  color,
}: {
  text: string;
  position: THREE.Vector3;
  color: string;
}) {
  const ref = useRef<any>(null);
  const opRef = useRef(0.5);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "crosshair" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useFrame((state) => {
    if (!ref.current) return;

    // Always face camera
    ref.current.quaternion.copy(state.camera.quaternion);

    // Depth-based opacity — back hemisphere fades
    const camDir = state.camera.position.clone().normalize();
    const wordDir = position.clone().normalize();
    const dot = camDir.dot(wordDir);
    const depth = THREE.MathUtils.clamp(
      THREE.MathUtils.mapLinear(dot, -1, 1, 0.03, 0.9),
      0.03,
      0.9,
    );

    // Retro flicker: back-side words have extra random noise
    const flicker =
      dot < 0 ? Math.max(0, depth + (Math.random() - 0.5) * 0.06) : depth;

    const target = hovered ? 1.0 : flicker;
    opRef.current = THREE.MathUtils.lerp(opRef.current, target, 0.1);
    if (ref.current.material) ref.current.material.opacity = opRef.current;

    // Scale — snap-scale on hover (pixel feel, no smooth ease)
    const s = hovered ? 1.5 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), 0.18);
  });

  // Pixel font looks best at larger, blocky sizes
  const fontSize = Math.max(0.2, Math.min(0.32, 2.0 / text.length));

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={fontSize}
      color={hovered ? "#ffffff" : color}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      anchorX="center"
      anchorY="middle"
      outlineWidth={hovered ? 0.012 : 0.004}
      outlineColor={color}
      outlineOpacity={hovered ? 1 : 0.3}
      // Press Start 2P loaded via Google Fonts in <style>
      font="https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2"
      characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.+#/_ "
    >
      {text}
    </Text>
  );
}

// ─── Globe word cloud ─────────────────────────────────────────────────────────
function Cloud({ radius = 4 }: { radius?: number }) {
  const words = useMemo(() => {
    const count = skills.length;
    const phiSpan = Math.PI * (3 - Math.sqrt(5));
    return skills.map((skill, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = phiSpan * i;
      return {
        skill,
        pos: new THREE.Vector3(
          Math.cos(th) * r * radius,
          y * radius,
          Math.sin(th) * r * radius,
        ),
      };
    });
  }, [radius]);

  return (
    <>
      {words.map(({ skill, pos }, i) => (
        <SkillWord
          key={i}
          position={pos}
          text={skill.name}
          color={CAT_COLOR[skill.category] ?? "#00ff41"}
        />
      ))}
    </>
  );
}

// ─── HUD overlays ─────────────────────────────────────────────────────────────
function HUD() {
  const px: React.CSSProperties = {
    fontFamily: "'Press Start 2P', monospace",
    color: "#00ff41",
    textShadow: "0 0 8px #00ff41, 0 0 20px #00ff4166",
    fontSize: "0.5rem",
    lineHeight: 1.8,
    letterSpacing: "0.04em",
  };

  const dim: React.CSSProperties = {
    ...px,
    color: "#00ff4166",
    textShadow: "none",
  };

  return (
    <>
      {/* Top-left: mission header */}
      <div style={{ position: "absolute", top: 16, left: 18, zIndex: 10 }}>
        <div style={dim}>// MISSION CTRL v2.4</div>
        <div style={{ ...px, fontSize: "0.58rem", marginTop: 4 }}>
          SKILL MATRIX
          <span className="blink" style={{ marginLeft: 6 }}>
            █
          </span>
        </div>
        <div style={{ ...dim, marginTop: 2 }}>
          {skills.length} MODULES LOADED
        </div>
      </div>

      {/* Top-right: fake coordinates */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 18,
          zIndex: 10,
          textAlign: "right",
        }}
      >
        <div style={dim}>LAT: 51.5074° N</div>
        <div style={dim}>LON: 000.1278° W</div>
        <div
          style={{
            ...px,
            marginTop: 4,
            color: "#ff6b08",
            textShadow: "0 0 8px #ff6b08",
          }}
        >
          ● ONLINE
        </div>
      </div>

      {/* Bottom legend */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 18,
          zIndex: 10,
        }}
      >
        {[
          { label: "LANG", color: "#00ff41" },
          { label: "FRMWK", color: "#ff6b08" },
          { label: "TOOL", color: "#00d4ff" },
          { label: "PLTFM", color: "#ff2d78" },
        ].map(({ label, color }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.42rem",
              color: color,
              textShadow: `0 0 6px ${color}`,
              letterSpacing: "0.05em",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                background: color,
                boxShadow: `0 0 6px ${color}, 0 0 12px ${color}88`,
                flexShrink: 0,
              }}
            />
            {label}
          </div>
        ))}
      </div>

      {/* Corner brackets — classic targeting reticle feel */}
      {["top-left", "top-right", "bottom-left", "bottom-right"].map(
        (corner) => {
          const [v, h] = corner.split("-") as [
            "top" | "bottom",
            "left" | "right",
          ];
          return (
            <div
              key={corner}
              style={{
                position: "absolute",
                [v]: 10,
                [h]: 10,
                width: 22,
                height: 22,
                borderTop: v === "top" ? "2px solid #00ff4166" : "none",
                borderBottom: v === "bottom" ? "2px solid #00ff4166" : "none",
                borderLeft: h === "left" ? "2px solid #00ff4166" : "none",
                borderRight: h === "right" ? "2px solid #00ff4166" : "none",
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
          );
        },
      )}
    </>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function SkillCloud() {
  const RADIUS = 4.5;

  return (
    <>
      <style>{crtStyles}</style>

      <div
        className="crt-wrap w-full h-[600px] cursor-grab active:cursor-grabbing"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#000a02", // deep phosphor-green-tinted black
          // Subtle outer glow to frame the component
          boxShadow: "inset 0 0 60px #00ff4108",
        }}
      >
        {/* CRT scanlines overlay */}
        <div
          className="scanlines"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            pointerEvents: "none",
          }}
        />

        {/* Green phosphor vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 40%, #000a0288 80%, #000a02dd 100%)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        {/* Three.js canvas */}
        <Canvas dpr={[1, 2]} style={{ position: "absolute", inset: 0 }}>
          <PerspectiveCamera makeDefault position={[0, 0, 11]} fov={42} />

          {/* Green-tinted fog for depth */}
          <fog attach="fog" args={["#000a02", 9, 20]} />

          {/* Phosphor lights */}
          <ambientLight intensity={0.05} color="#00ff41" />
          <pointLight position={[8, 6, 8]} intensity={0.7} color="#00ff41" />
          <pointLight position={[-8, -6, -6]} intensity={0.3} color="#ff6b08" />

          <Suspense fallback={null}>
            <StarField />
            <GlobeLattice radius={RADIUS} />
            <Cloud radius={RADIUS} />
          </Suspense>

          <TrackballControls
            noPan
            noZoom
            rotateSpeed={2.2}
            staticMoving={false}
            dynamicDampingFactor={0.06}
          />
        </Canvas>

        {/* HUD elements on top */}
        <HUD />
      </div>
    </>
  );
}
