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

  const showIframe = Boolean(url) && !iframeError;

  return (
    <div className={className}>
      <div
        onClick={handleContainerClick}
        title={targetLink ? `Open ${displayUrl} in a new tab` : title}
        className={`card group overflow-hidden ${targetLink ? "cursor-pointer card-hover" : ""}`}
      >
        {/* Browser bar */}
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3f3f46]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3f3f46]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3f3f46]" />
          </div>
          <div className="min-w-0 flex-1 truncate rounded-md bg-[var(--color-bg)] px-3 py-1 font-mono text-xs text-[var(--color-muted)]">
            {displayUrl}
          </div>
          <span className="hidden shrink-0 font-mono text-[11px] text-[var(--color-subtle)] sm:inline">
            {isLoading ? "loading…" : showIframe ? "● live" : "screenshot"}
          </span>
        </div>

        {/* Viewport */}
        <div
          className="relative w-full overflow-hidden bg-[var(--color-bg)]"
          style={{ aspectRatio }}
        >
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-[var(--color-surface)]"
              >
                <span className="font-mono text-sm text-[var(--color-subtle)]">
                  <span className="text-[var(--color-accent)]">$</span>{" "}
                  connecting to live preview
                  <span className="cursor-blink">_</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {showIframe && (
            <motion.iframe
              ref={iframeRef}
              src={url}
              title={`${title} live preview`}
              loading="lazy"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-scripts allow-same-origin allow-forms"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              // Clicks pass through to the container, which opens a new tab
              className="pointer-events-none h-full w-full border-0 bg-white"
            />
          )}

          {!showIframe && (
            <Image
              src={image}
              alt={`${title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover object-top"
            />
          )}

          {targetLink && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="btn btn-secondary btn-sm bg-[var(--color-bg)]">
                Open in new tab ↗
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
