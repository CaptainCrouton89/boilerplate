"use client";

import Lenis from "lenis";
import { ReactNode, useEffect, useRef } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.03,
      easing: (t) => Math.min(1, 1.1 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

// Helper function to scroll to a specific element
export function scrollTo(target: string | HTMLElement) {
  if (typeof window === "undefined") return;

  const element =
    typeof target === "string" ? document.querySelector(target) : target;

  if (element) {
    const offset = -100; // Adjust this value as needed
    const y = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
