"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";

type Props = {
  footerId?: string;
  heroId?: string; // Add heroId prop
  bottomOffsetPx?: number;
  className?: string;
  centerVertically?: boolean;
};

export default function ScrollToggleArrow({
  footerId = "building",
  heroId = "hero", // Default hero section ID
  bottomOffsetPx = 24,
  className = "",
  centerVertically = false,
}: Props) {
  const [atFooter, setAtFooter] = useState(false);
  const [inHeroSection, setInHeroSection] = useState(false); // Track if in hero section
  const [, setReducedMotion] = useState(false);

  const getFooter = useMemo(() => {
    return () => {
      const byId = document.getElementById(footerId);
      if (byId) return byId;
      const byTag = document.querySelector("footer") as HTMLElement | null;
      return byTag || null;
    };
  }, [footerId]);

  const getHero = useMemo(() => {
    return () => {
      return document.getElementById(heroId) || null;
    };
  }, [heroId]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReducedMotion(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  useEffect(() => {
    const footerEl = getFooter();
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      (entries) => setAtFooter(entries.some((e) => e.isIntersecting)),
      { root: null, threshold: [0, 0.1] }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, [getFooter]);

  // Add intersection observer for hero section
  useEffect(() => {
    const heroEl = getHero();
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setInHeroSection(entries.some((e) => e.isIntersecting));
      },
      { root: null, threshold: 0.5 } // 50% of hero section visible
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [getHero]);

  const handleClick = () => {
    const footerEl = getFooter();
    if (atFooter) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (footerEl) {
      footerEl.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const style: React.CSSProperties = {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 50,
    backgroundColor: "transparent",
    color: "currentColor",
    border: "none",
    cursor: "pointer",
    outline: "none",
    transition: "opacity 0.3s ease, visibility 0.3s ease",
    visibility: inHeroSection ? "visible" : "hidden", // Hide when not in hero section
    opacity: inHeroSection ? 1 : 0, // Fade out when leaving hero section
  };

  if (centerVertically) {
    style.top = "92%";
    style.transform = "translate(-50%, -50%)";
  } else {
    style.bottom = `calc(env(safe-area-inset-bottom, 0px) + ${bottomOffsetPx}px)`;
  }


  return (
    <>
      {!atFooter && (
        <button
          type="button"
          aria-label="Scroll to footer"
          onClick={handleClick}
          style={style}
          className={className}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = "0.9";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <span
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            Jump to footer
          </span>

          {/* Down Chevron */}
          <svg
  width="50"
  height="50"
  viewBox="0 0 24 24"
  role="img"
  aria-hidden="true"
  fill="none"
  stroke="#83cff3ff" // dark gold shade
  strokeWidth="3"
  strokeLinecap="round"
  strokeLinejoin="round"
  style={{
    filter: "drop-shadow(0 0 8px #b5dbeeff)",
  }}
>
  <polyline
    points="6 7 12 13 18 7"
    style={{ animation: "glowDown 1.5s infinite ease-in-out" }}
  />
  <polyline
    points="6 11 12 17 18 11"
    style={{ animation: "glowDown 1.5s infinite ease-in-out", animationDelay: "0.3s" }}
  />
  <polyline
    points="6 15 12 21 18 15"
    style={{ animation: "glowDown 1.5s infinite ease-in-out", animationDelay: "0.6s" }}
  />
</svg>
   
        </button>
      )}
    </>
  );
}