"use client";

import { useEffect } from "react";

export function SmoothScrollOptimizer() {
  useEffect(() => {
    // Optimize scroll performance
    let rafId: number;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };

    // Passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Optimize CSS containment
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.style.contain = "layout style paint";
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}
