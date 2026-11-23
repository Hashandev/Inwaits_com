// app/not-found.tsx
// Custom 404 page.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <PageHeader
        pill="404 error"
        title={
          <>
            This page <span className="text-primary-ink">doesn&apos;t exist</span>
          </>
        }
        description="The link may be broken, or the page may have moved. Let's get you back on track."
      >
        <Button asChild size="xl">
          <Link href="/">
            <ArrowLeft aria-hidden="true" />
            Back to home
          </Link>
        </Button>
        <Button asChild size="xl" variant="outline">
          <Link href="/#contact">Contact us</Link>
        </Button>
      </PageHeader>

      <nav aria-label="Popular pages" className="container-page pb-24 md:pb-32">
        <ul className="flex flex-wrap justify-center gap-2">
          {site.nav
            .filter((link) => link.section !== "home")
            .map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-full border border-border bg-white/[0.02] px-4 py-2 text-sm text-text-muted transition-colors hover:border-primary/50 hover:text-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
}
