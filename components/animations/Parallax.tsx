"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  speed?: number;
  className?: string;
}

export default function Parallax({
  children,
  direction = "up",
  speed = 0.5,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate transform values based on direction
  const getTransformValue = () => {
    const baseValue = 100 * speed;

    switch (direction) {
      case "up":
        return useTransform(scrollYProgress, [0, 1], [baseValue, -baseValue]);
      case "down":
        return useTransform(scrollYProgress, [0, 1], [-baseValue, baseValue]);
      case "left":
        return useTransform(scrollYProgress, [0, 1], [baseValue, -baseValue]);
      case "right":
        return useTransform(scrollYProgress, [0, 1], [-baseValue, baseValue]);
      default:
        return useTransform(scrollYProgress, [0, 1], [baseValue, -baseValue]);
    }
  };

  const y =
    direction === "up" || direction === "down" ? getTransformValue() : 0;
  const x =
    direction === "left" || direction === "right" ? getTransformValue() : 0;

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}
