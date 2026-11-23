"use client";

// components/layout/motion-provider.tsx
// Wraps the app so every Motion animation respects the user's
// "reduce motion" setting: transform/layout animations are turned off,
// and opacity changes still run.

import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
