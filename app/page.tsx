// app/page.tsx
// Home page: one long page in menu order
//   Home → About → Services → Contact
// Each group has the id the menu links to (/#about …) and `data-nav-section`,
// so the menu highlights the group that is on screen while scrolling.

import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";
import { CtaContact } from "@/components/sections/cta-contact";

export default function HomePage() {
  return (
    <>
      <div id="home" data-nav-section>
        <Hero />
        {/* The "Trusted by" client logo strip (components/sections/logo-strip.tsx) is
            hidden until real client logos are added to data/clients.ts.
            To show it again, import LogoStrip and put <LogoStrip /> here. */}
      </div>

      <div id="about" data-nav-section>
        <About />
        <Stats />
        <Testimonials />
      </div>

      <div id="services" data-nav-section>
        <Services />
        <Process />
        <TechStack />
      </div>

      <div id="contact" data-nav-section>
        <CtaContact />
      </div>
    </>
  );
}
