// lib/utils.ts
import type { NavLink } from "@/data/site";

export { cn } from "cn";

/** True when `href` is the current page or a parent of it (e.g. /work for /work/my-project). */
export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Whether a menu link should be highlighted.
 * On the home page: the section currently in view.
 * On other pages: the link's standalone page (e.g. Work on /work/my-project).
 */
export function isNavLinkActive(link: NavLink, pathname: string, activeSection: string) {
  if (pathname === "/") return link.section === activeSection;
  return link.page ? isActivePath(pathname, link.page) : false;
}

/**
 * Smoothly scrolls to a home page section if it is on the current page.
 * Returns false when the target isn't on this page (let the link navigate instead).
 */
export function scrollToSection(href: string) {
  const id = href.split("#")[1];
  const target = id ? document.getElementById(id) : null;
  if (!target) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", id === "home" ? "/" : `/#${id}`);
  return true;
}
