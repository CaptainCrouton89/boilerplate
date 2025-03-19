"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type TextAnimationVariant =
  | "fadeIn"
  | "slideUp"
  | "typewriter"
  | "highlight"
  | "wordByWord"
  | "charByChar";

interface AnimatedTextProps {
  text: string;
  variant?: TextAnimationVariant;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  highlightColor?: string;
}

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  typewriter: {
    hidden: { width: "0%" },
    visible: { width: "100%" },
  },
  highlight: {
    hidden: { backgroundSize: "0% 100%" },
    visible: { backgroundSize: "100% 100%" },
  },
};

export default function AnimatedText({
  text,
  variant = "fadeIn",
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  element = "p",
  highlightColor = "rgba(255, 255, 0, 0.4)",
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  // For word-by-word animation
  const renderWordByWord = () => {
    const words = text.split(" ");
    return (
      <motion.div ref={ref} className={`inline-flex flex-wrap ${className}`}>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="mr-[0.25em] inline-block"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration,
                  delay: delay + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  // For character-by-character animation
  const renderCharByChar = () => {
    const chars = text.split("");
    return (
      <motion.div ref={ref} className={`inline-flex flex-wrap ${className}`}>
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: duration * 0.5,
                  delay: delay + i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  // For typewriter effect
  if (variant === "typewriter") {
    return (
      <div className="relative inline-block overflow-hidden">
        <motion.div
          ref={ref}
          className={`inline-block whitespace-nowrap ${className}`}
          initial="hidden"
          animate={controls}
          variants={variants.typewriter}
          transition={{
            duration: duration * 2,
            delay,
            ease: "linear",
          }}
        >
          {text}
        </motion.div>
      </div>
    );
  }

  // For highlight effect
  if (variant === "highlight") {
    return (
      <motion.div
        ref={ref}
        className={`inline-block ${className}`}
        initial="hidden"
        animate={controls}
        variants={variants.highlight}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          backgroundImage: `linear-gradient(to right, ${highlightColor}, ${highlightColor})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 100%",
        }}
      >
        {text}
      </motion.div>
    );
  }

  // For word-by-word animation
  if (variant === "wordByWord") {
    return renderWordByWord();
  }

  // For character-by-character animation
  if (variant === "charByChar") {
    return renderCharByChar();
  }

  // For standard animations (fadeIn, slideUp)
  const Component = motion[element];
  return (
    <Component
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {text}
    </Component>
  );
}
