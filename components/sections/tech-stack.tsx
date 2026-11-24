"use client";

// components/sections/tech-stack.tsx
// Technologies section:
// Elegant scroll-triggered stagger & float grid with spring entrance motion,
// subtle floating ambient hover, brand color illumination, and tooltip details.

import { motion, type Variants } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { techStack } from "@/data/tech";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export function TechStack() {
  return (
    <section id="tech" aria-labelledby="tech-title" className="section-y relative">
      <div className="container-page">
        <SectionHeader
          id="tech-title"
          pill="Technologies"
          title={
            <>
              Built with modern, <span className="text-primary-ink">reliable technology</span>
            </>
          }
          description="The frameworks and tools behind every site and system we ship — battle‑tested, well‑supported, and chosen for a reason."
        />

        {/* Floating staggered grid */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-3.5 sm:gap-4 md:mt-16"
        >
          {techStack.map(({ name, icon: Icon, color }) => (
            <motion.li
              key={name}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="w-[calc((100%-1.75rem)/3)] sm:w-28 md:w-32 lg:w-36"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    tabIndex={0}
                    role="img"
                    aria-label={name}
                    style={{ "--brand": color } as React.CSSProperties}
                    className="group card-surface flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm transition-all duration-300 outline-none hover:border-(--brand)/50 hover:bg-card hover:shadow-[0_8px_24px_-8px_var(--brand)] focus-visible:border-primary-light sm:h-28"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-8 text-text-dim transition-all duration-300 group-hover:scale-110 group-hover:text-(--brand) group-focus-visible:text-(--brand) sm:size-9"
                    />
                    <span
                      aria-hidden="true"
                      className="text-xs font-medium text-text-muted transition-colors duration-300 group-hover:text-text"
                    >
                      {name}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>{name}</TooltipContent>
              </Tooltip>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
