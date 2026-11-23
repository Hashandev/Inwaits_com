"use client";

// components/layout/mobile-menu.tsx
// Hamburger button + slide-in Sheet menu for screens below `lg`.
// On the home page, tapping a link closes the menu and then scrolls to the section.

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { site, whatsappUrl } from "@/data/site";
import { cn, isNavLinkActive, scrollToSection } from "@/lib/utils";

type MobileMenuProps = {
  pathname: string;
  activeSection: string;
};

export function MobileMenu({ pathname, activeSection }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const onHome = pathname === "/";

  /**
   * Close the menu first. The page is scroll-locked while the menu is open, so
   * we scroll (or navigate) once the slide-out animation has finished.
   */
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      if (!(onHome && scrollToSection(href))) router.push(href);
    }, 320);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[86%] gap-0 border-border bg-bg-soft p-0 sm:max-w-sm"
        // Don't move focus back to the menu button when closing (it would interrupt the scroll)
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Main navigation for the Inwaits website
          </SheetDescription>
          <Logo
            href="/#home"
            onClick={(e) => handleClick(e, "/#home")}
            className="self-start"
          />
        </SheetHeader>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {site.nav.map((link) => {
              const active = isNavLinkActive(link, pathname, activeSection);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    aria-current={active ? (onHome ? "location" : "page") : undefined}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      active
                        ? "bg-primary/15 text-text ring-1 ring-primary/30"
                        : "text-text-muted hover:bg-white/[0.04] hover:text-text",
                    )}
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className={cn(
                        "size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                        active ? "text-primary-light" : "text-text-dim",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <SheetFooter className="gap-3 border-t border-border p-5">
          <Button asChild size="lg">
            <Link href={site.cta.href} onClick={(e) => handleClick(e, site.cta.href)}>
              Get a Free Quote
            </Link>
          </Button>
          <Button asChild size="lg" variant="whatsapp">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </Button>
          <a
            href={`tel:${site.contact.phoneHref}`}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-md text-sm text-text-muted transition-colors hover:text-text"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {site.contact.phone}
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
