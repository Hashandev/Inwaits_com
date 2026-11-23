"use client";

// components/layout/use-active-section.ts
// Scroll spy: returns the id of the home page section that is crossing the
// middle of the screen, so the menu can highlight it while the user scrolls.
// Sections opt in with the `data-nav-section` attribute (see app/page.tsx).

import { useEffect, useState } from "react";

export function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (!enabled) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin line just above the middle of the screen
      { rootMargin: "-45% 0px -54% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}
