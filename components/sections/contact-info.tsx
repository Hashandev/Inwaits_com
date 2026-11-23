// components/sections/contact-info.tsx
// Contact details as a simple list split by thin lines (each row is a link),
// followed by the working hours. Details come from data/site.ts.

import { ArrowUpRight } from "lucide-react";
import { site, whatsappUrl } from "@/data/site";

const { contact } = site;

const rows = [
  { label: "Call us", value: contact.phone, href: `tel:${contact.phoneHref}`, external: false },
  { label: "WhatsApp", value: contact.whatsappDisplay, href: whatsappUrl(), external: true },
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, external: false },
  {
    label: "Visit us",
    value: contact.address.full,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address.full)}`,
    external: true,
  },
];

export function ContactInfo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="border-t border-border">
        {rows.map(({ label, value, href, external }) => (
          <li key={label} className="border-b border-border">
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center justify-between gap-6 rounded-md py-5"
            >
              <span className="min-w-0">
                <span className="block text-sm text-text-muted">{label}</span>
                <span className="mt-1 block text-lg font-medium break-words text-text transition-colors duration-200 group-hover:text-primary-light">
                  {value}
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-5 shrink-0 text-text-dim transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-light"
              />
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <p className="text-sm text-text-muted">Working hours</p>
        <dl className="mt-3 space-y-1.5 text-sm">
          {contact.hours.map((row) => (
            <div key={row.days} className="flex justify-between gap-4">
              <dt className="text-text">{row.days}</dt>
              <dd className="text-text-muted">{row.hours}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
