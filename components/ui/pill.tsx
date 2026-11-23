// components/ui/pill.tsx
// Small label above section headings, e.g. "● Our services".
// Quiet text with the green dot from the logo: the site's one signature detail.

import { cn } from "@/lib/utils";

type PillProps = {
  children: React.ReactNode;
  /** Kept for older call sites; every label uses the logo's green dot. */
  dot?: "primary" | "accent";
  className?: string;
};

export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[13px] leading-5 font-medium text-text-muted",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
      {children}
    </span>
  );
}
