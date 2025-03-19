"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    // Add event listeners for cursor variants
    const links = document.querySelectorAll("a, button, [role=button]");

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => setCursorVariant("hover"));
      link.addEventListener("mouseleave", () => setCursorVariant("default"));
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);

      links.forEach((link) => {
        link.removeEventListener("mouseenter", () => setCursorVariant("hover"));
        link.removeEventListener("mouseleave", () =>
          setCursorVariant("default")
        );
      });
    };
  }, []);

  const variants: Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      transition: {
        type: "spring",
        mass: 0.6,
        damping: 28,
      },
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      transition: {
        type: "spring",
        mass: 0.6,
        damping: 28,
      },
    },
  };

  // Only show custom cursor on desktop
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return null;
  }

  return (
    <>
      <motion.div
        className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-50 backdrop-blur-sm mix-blend-difference"
        variants={variants}
        animate={cursorVariant}
      />
      <style jsx global>{`
        body {
          cursor: none;
        }

        @media (max-width: 1023px) {
          body {
            cursor: auto;
          }
        }
      `}</style>
    </>
  );
}
