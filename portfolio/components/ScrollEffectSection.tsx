"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface ScrollEffectSectionProps {
  children: ReactNode;
}

const ScrollEffectSection = ({ children }: ScrollEffectSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Progress 0 → 1
          const scaleProgress = Math.min(scrollY / 2000, 0.2); // max 0.2 scale reduction
          const darkenProgress = Math.min(scrollY / 600, 0.6); // max 60% dark overlay

          // Scale content
          if (contentRef.current) {
            contentRef.current.style.transform = `scale(${1 - scaleProgress})`;
          }

          // Darken overlay
          if (overlayRef.current) {
            overlayRef.current.style.backgroundColor = `rgba(0,0,0,${darkenProgress})`;
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="sticky top-0 h-screen w-full overflow-hidden relative bg-[#1E1E1E]"
    >
      {/* Inner content wrapper — scales visually */}
      <div
        ref={contentRef}
        className="relative w-full h-full"
        style={{ transformOrigin: "center", willChange: "transform" }}
      >
        {children}
      </div>

      {/* Dark overlay - now on top with pointer-events-none */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none z-50"
        style={{ willChange: "background-color", backgroundColor: "rgba(0,0,0,0)" }}
      />
    </div>
  );
};

export default ScrollEffectSection;