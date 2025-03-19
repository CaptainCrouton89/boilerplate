"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "./animations/AnimatedText";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero3.webp"
          alt="Technology background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/10 to-black/5"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-md bg-primary/20 border border-primary/30 backdrop-blur-sm"
            >
              Reimagining Freelance Development
            </motion.div>

            <AnimatedText
              text="Code-First Freelancing Platform"
              variant="wordByWord"
              element="h1"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
              delay={0.3}
            />

            <AnimatedText
              text="DevBounty flips the script on traditional freelance platforms. Clients post bounties for work they need done, and developers submit code directly - no proposals, just results."
              variant="fadeIn"
              element="p"
              className="text-lg text-white/80 max-w-xl"
              delay={0.6}
              duration={0.8}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="font-medium">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-medium text-white"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-wrap items-center gap-6 text-white/70"
            >
              {["No Proposals", "Code-First", "Pay for Results"].map(
                (feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                    <span>{feature}</span>
                  </div>
                )
              )}
            </motion.div>
          </div>

          {/* Right column - Code display */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="relative z-10 bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-2xl">
                <div className="flex items-center mb-4 border-b border-white/10 pb-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-white/60 text-sm">DevBounty.js</div>
                </div>
                <pre className="text-sm text-white/90 font-mono overflow-x-auto">
                  <code>
                    {`// DevBounty.js
const bounty = {
  title: "Add a messaging platform to the app",
  budget: "$800",
  deadline: "3 days",
  requirements: [
    "Responsive design",
    "Accessible",
    "Well-tested"
  ],
  status: "Open for submissions"
};

// Submit your code directly
function submitSolution(code) {
  // No proposals, just results
  return DevBounty.submit(code);
}`}
                  </code>
                </pre>
              </div>

              {/* Subtle glow effects */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
