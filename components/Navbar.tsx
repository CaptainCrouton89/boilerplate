"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import AuthHeader from "./AuthHeader";
import { scrollTo } from "./SmoothScroll";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation click
  const handleNavClick = (target: string) => {
    setIsMobileMenuOpen(false);
    scrollTo(target);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <motion.a
            href="#"
            className="font-bold text-xl relative text-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-primary">Dev</span>Bounty
            <motion.span
              className="absolute -bottom-1 left-0 h-[2px] bg-primary"
              initial={{ width: 0 }}
              animate={{ width: isScrolled ? "100%" : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "How It Works", target: "#how-it-works" },
              { name: "Features", target: "#features" },
              { name: "FAQ", target: "#faq" },
            ].map((item) => (
              <motion.a
                key={item.name}
                className="text-foreground hover:text-primary transition-colors relative group"
                href={item.target}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.target);
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}

            <div className="flex items-center space-x-3">
              <AuthHeader />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col space-y-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="w-6 h-0.5 bg-foreground block"
              animate={
                isMobileMenuOpen
                  ? { rotate: 45, y: 8, width: 24 }
                  : { rotate: 0, y: 0, width: 24 }
              }
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-foreground block"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-foreground block"
              animate={
                isMobileMenuOpen
                  ? { rotate: -45, y: -8, width: 24 }
                  : { rotate: 0, y: 0, width: 24 }
              }
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-24 px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-6">
              {[
                { name: "How It Works", target: "#how-it-works" },
                { name: "Features", target: "#features" },
                { name: "FAQ", target: "#faq" },
              ].map((item) => (
                <motion.a
                  key={item.name}
                  className="text-foreground hover:text-primary transition-colors text-2xl font-medium"
                  href={item.target}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.target);
                  }}
                  whileHover={{ x: 10 }}
                  whileTap={{ x: 0 }}
                >
                  {item.name}
                </motion.a>
              ))}

              <AuthHeader />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
