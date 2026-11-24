"use client";

// components/sections/testimonials.tsx
// Modern & minimalist client testimonials:
// Clean multi-column masonry cards with subtle glow borders, 5-star ratings,
// verified badges, and smooth in-view entrance animations.

import { Star, CheckCircle2 } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { testimonials } from "@/data/testimonials";

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: EASE,
    },
  }),
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="section-y relative bg-bg-soft/60"
    >
      <div className="container-page">
        <SectionHeader
          id="testimonials-title"
          pill="Client Stories"
          title={
            <>
              Trusted by businesses, <span className="text-primary-ink">proven by results</span>
            </>
          }
          description="Real feedback from Sri Lankan businesses and professionals who scaled their digital presence with Inwaits."
        />

        {/* Minimalist modern grid cards */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="group card-surface relative flex flex-col justify-between rounded-2xl p-7 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/90 sm:p-8"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="size-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                  <span className="ml-2 font-mono text-xs font-medium text-text-dim">5.0</span>
                </div>

                {/* Quote text */}
                <p className="mt-5 text-[15px] leading-relaxed text-text-muted transition-colors duration-200 group-hover:text-text sm:text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="mt-8 flex items-center gap-3.5 border-t border-border/60 pt-5">
                <div className="grid size-10 place-items-center rounded-full bg-primary/10 font-heading text-xs font-bold text-primary-light ring-1 ring-primary/20 transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                  {initials(t.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-semibold text-text">{t.name}</span>
                    <CheckCircle2
                      aria-label="Verified client"
                      className="size-3.5 shrink-0 text-accent"
                    />
                  </div>
                  {t.role && (
                    <span className="block truncate text-xs text-text-dim">{t.role}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
