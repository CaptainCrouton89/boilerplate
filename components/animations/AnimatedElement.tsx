"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type AnimationVariant =
  | "fadeIn"
  | "slideUp"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "none";

interface AnimatedElementProps extends MotionProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: {},
    visible: {},
  },
};

export default function AnimatedElement({
  children,
  variant = "fadeIn",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  threshold = 0.1,
  ...props
}: AnimatedElementProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  const selectedVariant = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={selectedVariant}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Staggered container for creating staggered animations for children
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = "",
  ...props
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
} & MotionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger item to be used inside StaggerContainer
export function StaggerItem({
  children,
  variant = "slideUp",
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: AnimationVariant;
  className?: string;
} & MotionProps) {
  const selectedVariant = variants[variant];

  return (
    <motion.div variants={selectedVariant} className={className} {...props}>
      {children}
    </motion.div>
  );
}
