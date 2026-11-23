"use client";

// components/sections/work-grid.tsx
// Portfolio grid with filter tabs (All / Web / LMS / Software / Design) for /work.

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProjectCard } from "@/components/sections/project-card";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;
const filters: Filter[] = ["All", ...projectCategories];

export function WorkGrid() {
  const [active, setActive] = useState<Filter>("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="no-scrollbar mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-xl border border-border bg-card/70 p-1"
      >
        {filters.map((filter) => {
          const count =
            filter === "All" ? projects.length : projects.filter((p) => p.category === filter).length;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={active === filter}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                active === filter
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-white/[0.04] hover:text-text",
              )}
            >
              {filter}
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs",
                  active === filter ? "bg-white/20" : "bg-white/[0.06]",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <motion.ul layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="mt-12 text-center">No projects in this category yet.</p>
      )}
    </div>
  );
}
