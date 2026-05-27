"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor
 *
 * Two-layer cursor:
 *   1. A sharp 6px dot that snaps to the pointer instantly.
 *   2. A larger ring that lerps toward the pointer with slight lag,
 *      giving an organic trailing feel.
 *
 * On hover over interactive elements (a, button, [data-cursor-hover])
 * the ring expands and the dot fades — signalling clickability.
 *
 * Usage: render once at the root layout. Add `data-cursor-hover`
 * to any element you want the expand effect on.
 */
export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-hover]")) setHovered(true);
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-hover]")) setHovered(false);
    };

    const loop = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [visible]);

  return (
    <>
      {/* Sharp dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div
          className="rounded-full bg-white transition-all duration-200"
          style={{
            width: hovered ? "0px" : "5px",
            height: hovered ? "0px" : "5px",
            opacity: hovered ? 0 : 1,
          }}
        />
      </div>

      {/* Lagging ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div
          className="rounded-full border transition-all duration-200"
          style={{
            width: hovered ? "44px" : "28px",
            height: hovered ? "44px" : "28px",
            borderColor: hovered
              ? "rgba(129, 140, 248, 0.7)"   /* indigo-400 */
              : "rgba(255, 255, 255, 0.25)",
            backgroundColor: hovered
              ? "rgba(99, 102, 241, 0.08)"
              : "transparent",
            boxShadow: hovered
              ? "0 0 16px rgba(99, 102, 241, 0.3)"
              : "none",
          }}
        />
      </div>

      {/* Hide the OS cursor site-wide */}
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
};