"use server";

// app/actions/contact.ts
// Server Action for the contact form: checks the honeypot, validates with zod,
// then emails the enquiry to CONTACT_TO_EMAIL with Resend.

import { Resend } from "resend";
import {
  HONEYPOT_FIELD,
  budgetOptions,
  contactSchema,
  getFieldErrors,
  labelFor,
  serviceOptions,
  type ContactFieldErrors,
} from "@/lib/validations";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: ContactFieldErrors;
};

const SUCCESS_MESSAGE = "Thank you! Your message has been sent. We'll get back to you soon.";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Spam bots fill in every field, including the hidden one. Pretend it worked.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").length > 0) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    company: formData.get("company") ?? "",
    service: formData.get("service") ?? "",
    budget: formData.get("budget") ?? "",
    message: formData.get("message") ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: getFieldErrors(parsed.error),
    };
  }

  const data = parsed.data;
  const service = labelFor(serviceOptions, data.service);
  const budget = labelFor(budgetOptions, data.budget);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  // Falls back to Resend's test sender until your domain is verified in Resend
  const from = process.env.CONTACT_FROM_EMAIL || "Inwaits Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without email set up: log instead of sending.
      console.info("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL missing. Enquiry:", data);
      return { status: "success", message: `${SUCCESS_MESSAGE} (Dev mode: email not sent.)` };
    }
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return {
      status: "error",
      message: "Sorry, the form isn't working right now. Please call or WhatsApp us instead.",
    };
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company", data.company || "Not given"],
    ["Service", service],
    ["Budget", budget],
  ];

  const text = [
    "New enquiry from the Inwaits website",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#0E1335">
      <h2 style="margin:0 0 16px">New enquiry from the Inwaits website</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="color:#6B7199">${label}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#6B7199">Message</p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `New enquiry: ${service} – ${data.name}`,
      text,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        status: "error",
        message: "Sorry, we couldn't send your message. Please try again or WhatsApp us.",
      };
    }
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return {
      status: "error",
      message: "Sorry, something went wrong. Please try again or WhatsApp us.",
    };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}
