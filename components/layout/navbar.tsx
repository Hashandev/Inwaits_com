"use client";

// components/layout/navbar.tsx
// Fixed top navbar. Transparent at the top of the page; after scrolling it
// switches to a blurred glass background with a bottom border.
// On the home page, links scroll to their section and the highlight follows
// the section currently in view.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { useActiveSection } from "@/components/layout/use-active-section";
import { site } from "@/data/site";
import { cn, isNavLinkActive, scrollToSection } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const activeSection = useActiveSection(onHome);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** On the home page, scroll smoothly instead of navigating. */
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (onHome && scrollToSection(href)) event.preventDefault();
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-border/70 bg-bg/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-16 items-center justify-between gap-4 md:h-[4.5rem] lg:grid lg:grid-cols-[1fr_auto_1fr]"
      >
        <Logo
          href="/#home"
          className="justify-self-start"
          onClick={(e) => handleClick(e, "/#home")}
        />

        <ul className="hidden items-center gap-0.5 rounded-full border border-white/[0.06] bg-white/[0.025] p-1 lg:flex">
          {site.nav.map((link) => {
            const active = isNavLinkActive(link, pathname, activeSection);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  aria-current={active ? (onHome ? "location" : "page") : undefined}
                  className={cn(
                    "relative isolate block rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                    active ? "text-text" : "text-text-muted hover:text-text",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full border border-primary/50 bg-primary/15"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 justify-self-end">
          <Button asChild className="hidden sm:inline-flex">
            <Link href={site.cta.href} onClick={(e) => handleClick(e, site.cta.href)}>
              {site.cta.label}
            </Link>
          </Button>
          <MobileMenu pathname={pathname} activeSection={activeSection} />
        </div>
      </nav>
    </header>
  );
}
