"use server";

// app/actions/contact.ts
// Server Action for the contact form: checks the honeypot, validates with zod,
// then emails the enquiry to CONTACT_TO_EMAIL with Resend.

import { Resend } from "resend";
import nodemailer from "nodemailer";
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

  // Default target email address is hello@inwaits.com
  const to = process.env.CONTACT_TO_EMAIL || "hello@inwaits.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Inwaits Website <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY;

  // Support direct SMTP (e.g. cPanel / Zoho / Google Workspace for hello@inwaits.com)
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

  const hasResend = Boolean(apiKey);
  const hasSmtp = Boolean(smtpHost && smtpUser && smtpPass);

  if (!hasResend && !hasSmtp) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without email service: log enquiry to terminal
      console.info(
        `[contact] New enquiry for ${to} (Add RESEND_API_KEY or SMTP credentials in .env.local to send live emails):`,
        data,
      );
      return { status: "success", message: `${SUCCESS_MESSAGE} (Dev mode: logged to server console.)` };
    }
    console.error(`[contact] No email provider configured. Please configure RESEND_API_KEY or SMTP credentials.`);
    return {
      status: "error",
      message: "Sorry, email delivery is currently being set up. Please reach us via WhatsApp or phone.",
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
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#0E1335;line-height:1.6">
      <h2 style="margin:0 0 16px;color:#1530FF">New enquiry from the Inwaits website</h2>
      <table cellpadding="6" style="border-collapse:collapse;width:100%;max-width:550px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr style="border-bottom:1px solid #E2E8F0"><td style="color:#6B7199;width:120px">${label}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#6B7199;font-weight:bold">Message:</p>
      <div style="white-space:pre-wrap;background:#F8FAFC;padding:12px;border-radius:6px;border:1px solid #E2E8F0">${escapeHtml(data.message)}</div>
    </div>`;

  const subject = `New enquiry: ${service} – ${data.name}`;

  try {
    if (hasResend && apiKey) {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from,
        to: [to],
        replyTo: data.email,
        subject,
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
    } else if (hasSmtp) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: process.env.CONTACT_FROM_EMAIL || `Inwaits Website <${smtpUser}>`,
        to,
        replyTo: data.email,
        subject,
        text,
        html,
      });
    }
  } catch (err) {
    console.error("[contact] Unexpected error sending email:", err);
    return {
      status: "error",
      message: "Sorry, something went wrong while sending your message. Please try again or WhatsApp us.",
    };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}
