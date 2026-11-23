// components/sections/cta-contact.tsx
// CtaContact: minimal contact section for the home page (details list + quote form).
// CtaBand: big blue call-to-action band, used on the standalone /work and /blog pages.

import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/animated-section";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { ContactInfo } from "@/components/sections/contact-info";
import { ContactForm } from "@/components/sections/contact-form";
import { whatsappUrl } from "@/data/site";

/** `quoteHref` is "#quote" on the home page (where the form is) and "/#quote" elsewhere. */
export function CtaBand({ quoteHref = "#quote" }: { quoteHref?: string }) {
  return (
    <Reveal>
      <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-card to-bg-soft px-6 py-14 text-center sm:px-12 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(21,48,255,0.18),transparent)]"
        />

        <h2 id="cta-title" className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Ready to start your project?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
          Tell us what you need. We&apos;ll reply with a clear quote and the best technical approach to get it done.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="xl"
            className="bg-primary text-white hover:bg-primary-hover shadow-sm"
          >
            <a href={quoteHref}>
              Get a Free Quote
              {quoteHref.startsWith("#") ? (
                <ArrowDown aria-hidden="true" />
              ) : (
                <ArrowRight aria-hidden="true" />
              )}
            </a>
          </Button>
          <Button asChild size="xl" variant="whatsapp">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon aria-hidden="true" className="size-5" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </Reveal>
  );
}

/** Home page contact section: heading + contact list on the left, quote form on the right. */
export function CtaContact() {
  return (
    <section id="quote" aria-labelledby="contact-title" className="section-y relative bg-bg-soft">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal>
          <Pill>Contact</Pill>
          <h2
            id="contact-title"
            className="mt-5 text-[2.2rem] leading-[1.08] font-extrabold tracking-[-0.035em] sm:text-5xl"
          >
            Ready to start <span className="text-primary-ink">your project?</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed sm:text-lg">
            Tell us what you need. We&apos;ll reply with a free quote and the best way to get it
            done.
          </p>
          <ContactInfo className="mt-10" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-semibold text-text">Send us a message</h3>
            <p className="mt-1.5 mb-7 text-sm text-text-muted">Fields marked * are required.</p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
