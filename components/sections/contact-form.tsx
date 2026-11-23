"use client";

// components/sections/contact-form.tsx
// Quote request form. Validates in the browser first (zod), then calls the
// submitContact Server Action, which validates again and sends the email.

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HONEYPOT_FIELD,
  budgetOptions,
  contactSchema,
  getFieldErrors,
  serviceOptions,
  type ContactField,
  type ContactFieldErrors,
} from "@/lib/validations";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle", message: "" };

const fieldClass =
  "h-12 rounded-xl border-border bg-white/[0.02] px-4 text-[0.95rem] text-text placeholder:text-text-dim focus-visible:border-primary-light focus-visible:ring-2 focus-visible:ring-primary/30 dark:bg-white/[0.02] aria-invalid:border-destructive aria-invalid:ring-destructive/20";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  );
}

function FieldLabel({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <Label htmlFor={htmlFor} className="mb-2 text-sm font-medium text-text">
      {children}
      {optional ? (
        <span className="font-normal text-text-muted">(optional)</span>
      ) : (
        <span aria-hidden="true" className="text-primary-light">
          *
        </span>
      )}
    </Label>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors>({});
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const errors: ContactFieldErrors = { ...state.fieldErrors, ...clientErrors };

  // Show the result of each submission
  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      formRef.current?.reset();
      setService("");
      setBudget("");
      setClientErrors({});
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const result = contactSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      const fieldErrors = getFieldErrors(result.error);
      setClientErrors(fieldErrors);
      const first = Object.keys(fieldErrors)[0] as ContactField | undefined;
      if (first) form.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      toast.error("Please check the highlighted fields.");
      return;
    }

    setClientErrors({});
    startTransition(() => formAction(formData));
  }

  /** Clears a field's error as soon as the user edits it */
  function clearError(field: ContactField) {
    if (errors[field]) setClientErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const a11y = (field: ContactField) => ({
    "data-field": field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="relative grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
            onChange={() => clearError("name")}
            {...a11y("name")}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
            onChange={() => clearError("email")}
            {...a11y("email")}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="07X XXX XXXX"
            className={fieldClass}
            onChange={() => clearError("phone")}
            {...a11y("phone")}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
        <div>
          <FieldLabel htmlFor="company" optional>
            Company Name
          </FieldLabel>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Your business or class"
            className={fieldClass}
            onChange={() => clearError("company")}
            {...a11y("company")}
          />
          <FieldError id="company-error" message={errors.company} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="service">Service</FieldLabel>
          <Select
            name="service"
            value={service}
            onValueChange={(value) => {
              setService(value);
              clearError("service");
            }}
          >
            <SelectTrigger
              id="service"
              className={cn(fieldClass, "w-full data-[size=default]:h-12 data-placeholder:text-text-dim")}
              {...a11y("service")}
            >
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent position="popper" className="border-border bg-card">
              {serviceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="py-2">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id="service-error" message={errors.service} />
        </div>
        <div>
          <FieldLabel htmlFor="budget" optional>
            Budget range
          </FieldLabel>
          <Select name="budget" value={budget} onValueChange={setBudget}>
            <SelectTrigger
              id="budget"
              className={cn(fieldClass, "w-full data-[size=default]:h-12 data-placeholder:text-text-dim")}
              {...a11y("budget")}
            >
              <SelectValue placeholder="Choose a range" />
            </SelectTrigger>
            <SelectContent position="popper" className="border-border bg-card">
              {budgetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="py-2">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id="budget-error" message={errors.budget} />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your project: what you need, your timeline and anything else we should know."
          className={cn(fieldClass, "min-h-36 py-3")}
          onChange={() => clearError("message")}
          {...a11y("message")}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      {/* Honeypot: hidden from people, bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-muted">We&apos;ll never share your details.</p>
        <Button type="submit" size="xl" disabled={pending} className="w-full sm:w-auto">
          {pending ? (
            <>
              <Loader2 aria-hidden="true" className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
