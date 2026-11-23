"use client";

// components/layout/back-to-top.tsx
// "Back to top" button (bottom-right) that appears after scrolling down.

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed right-4 bottom-4 z-40 grid size-12 place-items-center rounded-full border border-border bg-card/90 text-text shadow-lg backdrop-blur transition-colors hover:border-primary/60 hover:bg-primary/20 sm:right-6 sm:bottom-6"
        >
          <ArrowUp aria-hidden="true" className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
