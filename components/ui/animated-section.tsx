"use client";

// components/ui/animated-section.tsx
// Scroll-reveal helpers (Motion). Content fades up once when it scrolls into view.
//   <Reveal>…</Reveal>                         a single block
//   <RevealGroup><RevealItem/>…</RevealGroup>  children appear one after another
// With "reduce motion" on, only the fade runs (no movement); see MotionProvider.

import { motion, type Variants } from "motion/react";

// One easing curve and short durations across the site; content rises only 8px
const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance to move up while fading in (px) */
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 8 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child */
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
};

export function RevealGroup({
  children,
  className,
  stagger = 0.05,
  delay = 0,
  as = "div",
}: RevealGroupProps) {
  const Component = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;
  return (
    <Component
      className={className}
      variants={groupVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
};

export function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  const Component = as === "li" ? motion.li : motion.div;
  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
