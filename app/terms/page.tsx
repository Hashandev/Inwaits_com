// app/terms/page.tsx
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { ComingSoon } from "@/components/ui/coming-soon";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use the Inwaits website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        pill="Legal"
        title="Terms of Service"
        description="The terms that apply when you use our website and services."
      />
      {/* TODO: add your terms of service text */}
      <ComingSoon />
    </>
  );
}
