// components/ui/coming-soon.tsx
// TEMPORARY: shown on inner pages until their full content is built.
// Keeps the page useful by offering direct ways to contact Inwaits.

import Link from "next/link";
import { ArrowLeft, Hammer, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { site, whatsappUrl } from "@/data/site";

export function ComingSoon() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <div className="card-surface relative mx-auto max-w-3xl overflow-hidden px-6 py-10 text-center sm:px-12 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 bg-glow opacity-60"
          />

          <span className="relative mx-auto grid size-12 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <Hammer aria-hidden="true" className="size-5 text-primary-light" />
          </span>

          <h2 className="relative mt-6 text-2xl sm:text-3xl">This page is almost ready</h2>
          <p className="relative mx-auto mt-4 max-w-xl leading-relaxed">
            We&apos;re still putting this page together. In the meantime, you can reach the
            Inwaits team directly. The first consultation is free.
          </p>

          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="whatsapp">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon aria-hidden="true" className="size-4" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${site.contact.phoneHref}`}>
                <Phone aria-hidden="true" />
                {site.contact.phone}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`mailto:${site.contact.email}`}>
                <Mail aria-hidden="true" />
                {site.contact.email}
              </a>
            </Button>
          </div>

          <Link
            href="/"
            className="relative mt-8 inline-flex items-center gap-1.5 rounded-md text-sm text-primary-light transition-colors hover:text-text"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
