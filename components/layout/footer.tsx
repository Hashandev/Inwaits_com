// components/layout/footer.tsx
// Site footer: brand + socials, quick links, services, contact, bottom bar.

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { WhatsAppIcon, socialIcons } from "@/components/ui/brand-icons";
import { services } from "@/data/services";
import { site, whatsappUrl } from "@/data/site";

const headingClass = "font-sans text-sm font-semibold tracking-normal text-text";
const linkClass = "rounded-sm text-sm text-text-muted transition-colors hover:text-text";

export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = site;

  return (
    <footer className="relative border-t border-border bg-bg-soft">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:gap-10 lg:py-20">
        {/* Brand */}
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Websites, custom software and digital platforms for modern businesses and enterprises.
            Designed, built and hosted in Ratnapura.
          </p>
          <ul className="mt-6 flex gap-2.5">
            {site.social.map(({ platform, label, href }) => {
              const Icon = socialIcons[platform];
              return (
                <li key={platform}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Inwaits on ${label}`}
                    className="grid size-10 place-items-center rounded-xl border border-border bg-white/[0.03] text-text-muted transition-colors hover:border-primary/60 hover:bg-primary/10 hover:text-text"
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick links */}
        <nav aria-labelledby="footer-quick-links">
          <h2 id="footer-quick-links" className={headingClass}>
            Quick Links
          </h2>
          <ul className="mt-5 space-y-3">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className={headingClass}>
            Services
          </h2>
          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href="/#services" className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className={headingClass}>Contact</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={`tel:${contact.phoneHref}`} className={`flex items-start gap-3 ${linkClass}`}>
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary-light" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={`flex items-start gap-3 ${linkClass}`}>
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary-light" />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-start gap-3 ${linkClass}`}
              >
                <WhatsAppIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                {contact.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3 text-text-muted">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary-light" />
              <address className="not-italic">{contact.address.full}</address>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-sm text-text-muted sm:flex-row">
          <p>© {year} Inwaits. All rights reserved.</p>
          <ul className="flex items-center gap-2">
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy Policy
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <Link href="/terms" className={linkClass}>
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
