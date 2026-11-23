// components/sections/logo-strip.tsx
// "Trusted by" infinite marquee of client logos (CSS animation, pauses on hover).

import Image from "next/image";
import { clients, type Client } from "@/data/clients";

function ClientLogo({ client }: { client: Client }) {
  if (client.logo) {
    return (
      <Image
        src={client.logo}
        alt={client.name}
        width={160}
        height={48}
        className="h-9 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      />
    );
  }

  const Mark = client.mark;
  return (
    <span className="group/logo flex items-center gap-2.5 text-text-dim transition-colors duration-300 hover:text-text">
      <Mark
        aria-hidden="true"
        className="size-6 transition-colors duration-300 group-hover/logo:text-primary-light"
      />
      <span className="font-heading text-xl font-bold tracking-tight whitespace-nowrap">
        {client.name}
      </span>
    </span>
  );
}

function LogoList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16"
    >
      {clients.map((client) => (
        <li key={client.name}>
          <ClientLogo client={client} />
        </li>
      ))}
    </ul>
  );
}

export function LogoStrip() {
  return (
    <section
      aria-labelledby="clients-title"
      className="relative border-y border-border/60 bg-bg-soft/50 py-10 md:py-12"
    >
      <div className="container-page">
        <h2
          id="clients-title"
          className="text-center font-sans text-sm font-normal tracking-normal text-text-muted"
        >
          Trusted by businesses and educators across Sri Lanka
        </h2>
      </div>

      <div className="group/marquee relative mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee [--marquee-duration:45s] group-hover/marquee:[animation-play-state:paused]">
          <LogoList />
          {/* Second copy makes the loop seamless; hidden from screen readers */}
          <LogoList hidden />
        </div>
      </div>
    </section>
  );
}
