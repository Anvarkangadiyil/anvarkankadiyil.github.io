"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectPreviewProps {
  url?: string;
  image: string;
  title: string;
  github?: string;
  aspectRatio?: string;
  className?: string;
}

export default function ProjectPreview({
  url,
  image,
  title,
  github,
  aspectRatio = "16/9",
  className = "",
}: ProjectPreviewProps) {
  const [iframeError, setIframeError] = useState(!url);
  const [isLoading, setIsLoading] = useState(Boolean(url));
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!url) return;

    // Timeout safety fallback: If iframe framing is blocked (X-Frame-Options/CSP) or times out
    const timer = setTimeout(() => {
      setIsLoaded((prevLoaded) => {
        if (!prevLoaded) {
          setIframeError(true);
          setIsLoading(false);
        }
        return prevLoaded;
      });
    }, 4500);

    return () => clearTimeout(timer);
  }, [url]);

  const handleIframeLoad = () => {
    setIsLoaded(true);
    setIsLoading(false);

    try {
      if (iframeRef.current) {
        const doc =
          iframeRef.current.contentDocument ||
          iframeRef.current.contentWindow?.document;
        if (doc && doc.URL === "about:blank") {
          setIframeError(true);
        }
      }
    } catch {
      // Cross-origin access exception is normal when external live site loads cleanly
    }
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIsLoading(false);
  };

  const targetLink = url || github;

  const handleContainerClick = () => {
    if (targetLink) {
      window.open(targetLink, "_blank", "noopener,noreferrer");
    }
  };

  const displayUrl = url
    ? url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${title.toLowerCase().replace(/\s+/g, "-")}.png`;

  return (
    <div className={`project-preview-wrapper ${className}`}>
      {/* Cyberpunk Browser Frame Container */}
      <div
        onClick={handleContainerClick}
        title={targetLink ? `Click to launch ${displayUrl} in a new tab` : title}
        style={{
          background: "#050508",
          border: "4px solid var(--neon-green)",
          boxShadow: "8px 8px 0 var(--neon-cyan)",
          padding: "8px",
          position: "relative",
          cursor: targetLink ? "pointer" : "default",
          overflow: "hidden",
          transition:
            "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
        }}
        className="group hover:border-[var(--neon-cyan)] hover:shadow-[8px_8px_0_var(--neon-purple)]"
      >
        {/* Browser Top Window Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "3px solid var(--neon-green)",
            paddingBottom: "6px",
            marginBottom: "8px",
            fontSize: "0.75rem",
          }}
        >
          {/* Controls Dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {[
              "var(--neon-green)",
              "var(--neon-cyan)",
              "var(--neon-purple)",
            ].map((color, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  background: color,
                  border: `1px solid ${color}`,
                  borderRadius: "2px",
                }}
              />
            ))}
          </div>

          {/* Cyberpunk Address Bar */}
          <div
            style={{
              flex: 1,
              maxWidth: "60%",
              margin: "0 12px",
              background: "#111116",
              border: "1px solid rgba(0, 255, 255, 0.3)",
              padding: "2px 10px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "var(--neon-green)", fontSize: "0.6rem" }}>
              🔒
            </span>
            <span
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: "0.95rem",
                color: "#e0e0e0",
                letterSpacing: "0.05em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {url ? url : `LOCAL://${displayUrl}`}
            </span>
          </div>

          {/* Status Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontFamily: "var(--font-press-start), monospace",
                fontSize: "0.42rem",
                padding: "2px 6px",
                background:
                  url && !iframeError
                    ? "rgba(57, 255, 20, 0.15)"
                    : "rgba(255, 0, 255, 0.15)",
                border:
                  url && !iframeError
                    ? "1px solid var(--neon-green)"
                    : "1px solid var(--neon-purple)",
                color:
                  url && !iframeError
                    ? "var(--neon-green)"
                    : "var(--neon-purple)",
                letterSpacing: "0.05em",
              }}
            >
              {isLoading
                ? "LOADING..."
                : url && !iframeError
                ? "● LIVE IFRAME"
                : "▲ SCREENSHOT"}
            </span>

            {targetLink && (
              <span
                style={{
                  fontFamily: "var(--font-press-start), monospace",
                  fontSize: "0.45rem",
                  color: "var(--neon-cyan)",
                }}
              >
                ↗
              </span>
            )}
          </div>
        </div>

        {/* Viewport Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: aspectRatio,
            background: "#000",
            overflow: "hidden",
          }}
        >
          {/* 1. Loading Spinner Overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 20,
                  background: "rgba(5, 5, 10, 0.92)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                {/* Cyberpunk Spinner */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    border: "3px solid rgba(0, 255, 255, 0.2)",
                    borderTop: "3px solid var(--neon-cyan)",
                    borderRight: "3px solid var(--neon-green)",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-press-start), monospace",
                    fontSize: "0.55rem",
                    color: "var(--neon-cyan)",
                    letterSpacing: "0.08em",
                  }}
                >
                  CONNECTING TO LIVE EMBED...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2. Live Iframe (if URL provided and no error) */}
          {url && !iframeError && (
            <motion.iframe
              ref={iframeRef}
              src={url}
              title={`${title} Live Preview`}
              loading="lazy"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-scripts allow-same-origin allow-forms"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                pointerEvents: "none", // Clicks pass through to container to launch new tab
                background: "#ffffff",
              }}
            />
          )}

          {/* 3. Fallback Screenshot (if no URL or iframe failed) */}
          {(iframeError || !url) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={image}
                alt={`${title} Preview Screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                style={{
                  objectFit: "cover",
                  imageRendering: "pixelated",
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
            </motion.div>
          )}

          {/* Hover launch hint overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              background: "rgba(0, 0, 0, 0.35)",
              opacity: 0,
              transition: "opacity 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
            className="group-hover:opacity-100"
          >
            <span
              style={{
                fontFamily: "var(--font-press-start), monospace",
                fontSize: "0.6rem",
                color: "#ffffff",
                background: "rgba(0, 0, 0, 0.85)",
                border: "2px solid var(--neon-cyan)",
                boxShadow: "4px 4px 0 var(--neon-purple)",
                padding: "8px 14px",
                letterSpacing: "0.08em",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              ▶ LAUNCH WEBSITE IN NEW TAB ↗
            </span>
          </div>
        </div>

        {/* Footer info bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "6px",
            padding: "2px 4px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            {iframeError || !url
              ? "IMAGE SCREENSHOT FALLBACK"
              : "INTERACTIVE LIVE EMBED VIEWPORT"}
          </p>

          <span
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: "0.45rem",
              color: "var(--neon-cyan)",
            }}
          >
            [ CLICK TO OPEN ]
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
