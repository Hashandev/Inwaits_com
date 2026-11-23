// app/privacy/page.tsx
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { ComingSoon } from "@/components/ui/coming-soon";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Inwaits collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        pill="Legal"
        title="Privacy Policy"
        description="How we collect, use and protect the information you share with us."
      />
      {/* TODO: add your privacy policy text */}
      <ComingSoon />
    </>
  );
}
