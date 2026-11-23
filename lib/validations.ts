// lib/validations.ts
// Contact form schema, shared by the browser (instant feedback) and the
// server action (the real check). Edit the select options here.

import { z } from "zod";

export const serviceOptions = [
  { value: "website", label: "Website" },
  { value: "lms", label: "LMS" },
  { value: "software", label: "Software" },
  { value: "hosting", label: "Hosting & Domains" },
  { value: "other", label: "Other" },
] as const;

// TODO: adjust the budget ranges if you like
export const budgetOptions = [
  { value: "under-50k", label: "Below Rs. 50,000" },
  { value: "50k-150k", label: "Rs. 50,000 – 150,000" },
  { value: "150k-300k", label: "Rs. 150,000 – 300,000" },
  { value: "300k-plus", label: "Above Rs. 300,000" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

const serviceValues = serviceOptions.map((o) => o.value) as [
  (typeof serviceOptions)[number]["value"],
  ...(typeof serviceOptions)[number]["value"][],
];
const budgetValues = budgetOptions.map((o) => o.value) as [
  (typeof budgetOptions)[number]["value"],
  ...(typeof budgetOptions)[number]["value"][],
];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Please keep your name under 80 characters."),
  email: z.string().trim().pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{9,16}$/, "Please enter a valid phone number, e.g. 072 867 7570."),
  company: z.string().trim().max(100, "Please keep this under 100 characters.").optional(),
  service: z.enum(serviceValues, { error: "Please choose a service." }),
  budget: z.union([z.enum(budgetValues), z.literal("")]).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(3000, "Please keep your message under 3000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

/** Name of the hidden anti-spam field. Real people never fill it in. */
export const HONEYPOT_FIELD = "company_website";

/** First error message for each field. */
export function getFieldErrors(error: z.ZodError<ContactInput>): ContactFieldErrors {
  const flat = z.flattenError(error).fieldErrors as Partial<Record<ContactField, string[]>>;
  const result: ContactFieldErrors = {};
  for (const key of Object.keys(flat) as ContactField[]) {
    const message = flat[key]?.[0];
    if (message) result[key] = message;
  }
  return result;
}

export function labelFor(
  options: readonly { value: string; label: string }[],
  value: string | undefined,
) {
  return options.find((o) => o.value === value)?.label ?? "Not specified";
}
