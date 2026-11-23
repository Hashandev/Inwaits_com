// components/ui/logo.tsx
// The Inwaits wordmark: "Inwaits" in bold + a green dot.

import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

const sizes: Record<LogoSize, string> = {
  sm: "text-lg",
  md: "text-[1.4rem]",
  lg: "text-3xl",
};

type LogoMarkProps = {
  size?: LogoSize;
  className?: string;
};

/** The wordmark on its own (no link). Use it inside other links or in images. */
export function LogoMark({ size = "md", className }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-heading leading-none font-extrabold tracking-[-0.04em] text-text select-none",
        sizes[size],
        className,
      )}
    >
      Inwaits
      <span
        aria-hidden="true"
        className="ml-[0.06em] inline-block size-[0.24em] translate-y-[-0.02em] rounded-full bg-accent"
      />
    </span>
  );
}

type LogoProps = LogoMarkProps & {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

/** The wordmark as a link to the home page. */
export function Logo({ href = "/", size = "md", className, onClick }: LogoProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="Inwaits home"
      className={cn("inline-flex rounded-md", className)}
    >
      <LogoMark size={size} />
    </Link>
  );
}
