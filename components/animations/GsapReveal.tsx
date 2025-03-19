"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useEffect, useRef } from "react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  animation?:
    | "fadeIn"
    | "slideUp"
    | "slideLeft"
    | "slideRight"
    | "scale"
    | "custom";
  delay?: number;
  duration?: number;
  ease?: string;
  threshold?: number;
  customProps?: Record<string, any>;
}

export default function GsapReveal({
  children,
  className = "",
  animation = "fadeIn",
  delay = 0,
  duration = 0.8,
  ease = "power3.out",
  threshold = 0.1,
  customProps,
}: GsapRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    let animationProps = {};

    // Set animation properties based on animation type
    switch (animation) {
      case "fadeIn":
        animationProps = { opacity: 0 };
        break;
      case "slideUp":
        animationProps = { opacity: 0, y: 50 };
        break;
      case "slideLeft":
        animationProps = { opacity: 0, x: 50 };
        break;
      case "slideRight":
        animationProps = { opacity: 0, x: -50 };
        break;
      case "scale":
        animationProps = { opacity: 0, scale: 0.8 };
        break;
      case "custom":
        animationProps = customProps || {};
        break;
    }

    // Set initial state
    gsap.set(elementRef.current, animationProps);

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: `top bottom-=${threshold * 100}%`,
        toggleActions: "play none none none",
      },
    });

    tl.to(elementRef.current, {
      ...Object.fromEntries(
        Object.entries(animationProps).map(([key, value]) => [
          key,
          key === "opacity" ? 1 : 0,
        ])
      ),
      duration,
      delay,
      ease,
    });

    return () => {
      // Clean up ScrollTrigger
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [animation, delay, duration, ease, threshold, customProps]);

  return (
    <div ref={triggerRef} className={className}>
      <div ref={elementRef}>{children}</div>
    </div>
  );
}

// Text reveal component with GSAP
export function GsapTextReveal({
  text,
  className = "",
  staggerDelay = 0.05,
  delay = 0,
  duration = 0.8,
  ease = "power3.out",
  threshold = 0.1,
  element = "h2",
}: {
  text: string;
  className?: string;
  staggerDelay?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  threshold?: number;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement[]>([]);

  // Add a span to the textRef array
  const addToRefs = (el: HTMLSpanElement | null) => {
    if (el && !textRef.current.includes(el)) {
      textRef.current.push(el);
    }
  };

  useEffect(() => {
    if (!containerRef.current || textRef.current.length === 0) return;

    // Set initial state
    gsap.set(textRef.current, { opacity: 0, y: 20 });

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: `top bottom-=${threshold * 100}%`,
        toggleActions: "play none none none",
      },
    });

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration,
      stagger: staggerDelay,
      delay,
      ease,
    });

    return () => {
      // Clean up ScrollTrigger
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [delay, duration, ease, staggerDelay, threshold]);

  const words = text.split(" ");

  return (
    <div ref={triggerRef}>
      <div className={`inline-flex flex-wrap ${className}`} ref={containerRef}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            ref={addToRefs}
            className="mr-[0.25em] inline-block"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
