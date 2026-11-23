// app/work/page.tsx
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { WorkGrid } from "@/components/sections/work-grid";
import { CtaBand } from "@/components/sections/cta-contact";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Websites, LMS platforms, business software and design projects built by Inwaits for clients across Sri Lanka.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        pill="Our Work"
        title={
          <>
            Projects we&apos;re <span className="text-primary-ink">proud of</span>
          </>
        }
        description="Websites, LMS platforms and business systems we've designed and built for clients across Sri Lanka."
      />

      <section aria-labelledby="projects-title" className="pb-24 md:pb-32">
        <h2 id="projects-title" className="sr-only">
          Projects
        </h2>
        <div className="container-page">
          <WorkGrid />
        </div>
      </section>

      <section aria-label="Start a project" className="pb-24 md:pb-32">
        <div className="container-page">
          <CtaBand quoteHref="/#quote" />
        </div>
      </section>
    </>
  );
}
