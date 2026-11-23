"use client";

// components/sections/testimonials.tsx
// "What our clients say": one review at a time in large type, with a row of
// initials to switch between them. Reviews change automatically (a thin line
// under the current person shows the time) and pause while hovered or focused.
// Content lives in data/testimonials.ts.

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/animated-section";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

/** Seconds each review stays on screen */
const ROTATE_SECONDS = 7;

/** Large quiet quote marks that sit inline with the text without making lines taller */
const quoteMark =
  "relative top-[0.36em] mx-1.5 font-heading text-[2.2em] leading-[0] font-semibold text-text-dim select-none";

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
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  function handleTimerEnd(event: React.AnimationEvent<HTMLSpanElement>) {
    // Ignore instant "ends" (e.g. when animations are switched off by the system)
    if (event.elapsedTime < 1) return;
    setActive((i) => (i + 1) % testimonials.length);
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="section-y relative bg-bg-soft"
    >
      <div className="container-page">
        <SectionHeader
          id="testimonials-title"
          pill="Client testimonials"
          title={
            <>
              What our clients say
            </>
          }
        />

        <Reveal className="group mx-auto mt-12 max-w-4xl text-center md:mt-16">
          {/* All reviews share one grid cell, so the height never jumps */}
          <div className="grid">
            {testimonials.map((t, i) => {
              const isActive = i === active;
              return (
                <figure
                  key={t.name}
                  aria-hidden={!isActive}
                  className={cn(
                    "self-center transition-[opacity,transform,visibility] ease-out [grid-area:1/1]",
                    isActive
                      ? "visible translate-y-0 opacity-100 delay-150 duration-300"
                      : "invisible translate-y-2 opacity-0 duration-150",
                  )}
                >
                  <blockquote className="text-xl leading-relaxed font-medium tracking-[-0.01em] text-balance text-text sm:text-2xl md:text-[1.9rem] md:leading-[1.45]">
                    {/* Big quote marks before the first word and after the last word */}
                    <span aria-hidden="true" className={quoteMark}>
                      &ldquo;
                    </span>
                    {t.quote}
                    <span aria-hidden="true" className={quoteMark}>
                      &rdquo;
                    </span>
                  </blockquote>
                  <figcaption className="mt-8 text-sm sm:text-base">
                    <span className="font-semibold text-text">{t.name}</span>
                    {t.role && <span className="text-text-muted"> · {t.role}</span>}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* People: pick a review */}
          <div
            role="group"
            aria-label="Choose a review"
            className="mt-12 flex justify-center gap-3 sm:gap-4"
          >
            {testimonials.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show review from ${t.name}`}
                  aria-pressed={isActive}
                  className="flex flex-col items-center gap-3 rounded-xl p-1"
                >
                  <span
                    className={cn(
                      "grid size-11 place-items-center rounded-full font-heading text-sm font-semibold transition-colors duration-150 ease-out sm:size-12",
                      isActive
                        ? "bg-primary text-white"
                        : "bg-white/[0.04] text-text-muted ring-1 ring-border hover:text-text hover:ring-border-strong",
                    )}
                  >
                    {initials(t.name)}
                  </span>
                  <span className="relative h-0.5 w-8 overflow-hidden rounded-full bg-border">
                    {isActive &&
                      (reduce ? (
                        <span className="absolute inset-0 bg-primary-light" />
                      ) : (
                        <span
                          onAnimationEnd={handleTimerEnd}
                          style={{ animationDuration: `${ROTATE_SECONDS}s` }}
                          className="absolute inset-0 origin-left animate-progress bg-primary-light group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]"
                        />
                      ))}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
