"use client";

// components/sections/process.tsx
// "How We Work" timeline.
// Desktop: the steps sit in one straight row. The line between them fills from
//   left to right as you scroll down, and each step lights up when it is reached.
// Mobile/tablet: the steps stack and the vertical line fills downwards the same way.

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { RevealGroup, RevealItem } from "@/components/ui/animated-section";
import { processSteps, type ProcessStep } from "@/data/process";

const count = processSteps.length;

function Step({
  step,
  index,
  progress,
}: {
  step: ProcessStep;
  index: number;
  progress: MotionValue<number>;
}) {
  // Where the line reaches this step (0 → 1). Capped so the last step finishes lighting up.
  const at = count > 1 ? index / (count - 1) : 1;
  const litEnd = Math.min(at + 0.01, 0.995);
  const lit = useTransform(progress, [Math.min(at - 0.03, litEnd - 0.03), litEnd], [0, 1]);
  const iconOpacity = useTransform(lit, [0, 1], [0.45, 1]);
  // Mobile: the short line from this step down to the next one
  const next = count > 1 ? (index + 1) / (count - 1) : 1;
  const segment = useTransform(progress, [at, next], [0, 1]);

  const Icon = step.icon;

  return (
    <RevealItem
      as="li"
      className="group relative flex gap-5 lg:flex-col lg:items-center lg:text-center"
    >
      {index < count - 1 && (
        <span
          aria-hidden="true"
          className="absolute top-14 -bottom-10 left-7 w-0.5 -translate-x-1/2 bg-border lg:hidden"
        >
          <motion.span
            style={{ scaleY: segment }}
            className="absolute inset-0 origin-top bg-primary"
          />
        </span>
      )}

      <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border border-border bg-card shadow-[0_0_0_6px_var(--bg-soft)] transition-transform duration-300 group-hover:-translate-y-1">
        <motion.span
          aria-hidden="true"
          style={{ opacity: lit }}
          className="absolute -inset-px rounded-2xl border border-primary/80 bg-primary/10"
        />
        <motion.span style={{ opacity: iconOpacity }} className="relative">
          <Icon aria-hidden="true" className="size-6 text-primary-light" />
        </motion.span>
      </span>

      <div className="pt-1 lg:pt-6">
        <p className="font-mono text-xs text-primary-light">
          Step {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-1.5 text-lg">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed">{step.description}</p>
      </div>
    </RevealItem>
  );
}

export function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  // With "reduce motion" on, show the line fully filled straight away
  const full = useMotionValue(1);
  const progress = reduce ? full : smooth;

  return (
    <section id="process" aria-labelledby="process-title" className="section-y relative bg-bg-soft">
      <div className="container-page">
        <SectionHeader
          id="process-title"
          pill="How We Work"
          title={
            <>
              Idea to <span className="text-primary-ink">Launch</span>
            </>
          }
          description="A clear process so you always know what's happening and what comes next."
        />

        <div ref={timelineRef} className="relative mt-16 lg:mt-20">
          {/* Desktop line from the first step to the last: faint track + fill */}
          <div
            aria-hidden="true"
            className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 -translate-y-1/2 bg-border lg:block"
          >
            <motion.div
              style={{ scaleX: progress }}
              className="absolute inset-0 origin-left bg-primary"
            />
          </div>

          <RevealGroup as="ol" stagger={0.12} className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {processSteps.map((step, i) => (
              <Step key={step.title} step={step} index={i} progress={progress} />
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
