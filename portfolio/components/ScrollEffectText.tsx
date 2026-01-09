"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface ScrollEffectTextProps {
  children: ReactNode;
}

const ScrollEffectText = ({ children }: ScrollEffectTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Progress 0 → 1 - text slides in from right as we scroll
          const translateProgress = Math.min(1 - scrollY / 1000, );
          const translateX = (translateProgress) * 0; // Start at 100%, end at 0%

          // Move content from right to center
          if (contentRef.current) {
            contentRef.current.style.transform = `translateX(${translateX}%)`;
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
      className="overflow-hidden relative"
    >
      {/* Inner content wrapper — translates horizontally */}
      <div
        ref={contentRef}
        className="relative w-fit h-full"
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollEffectText;