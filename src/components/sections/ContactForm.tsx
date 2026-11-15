"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  Button, Checkbox, CheckboxGroup, ErrorSummary, FormRow, Notice, SelectField, TextField, TextareaField, formClass,
} from "@/components/ui";
import { CLOUDS, type FieldErrors, TOPICS, topicFromQuery, validateContact } from "@/resources/contact";
import s from "./sections.module.scss";

/**
 * The one contact form (docs/website-transformation/07 §6.12, 08 §9; prototype: contact.html).
 * Errors appear on submit, not while typing: a summary at the top links to each field and
 * receives focus. On success the form is replaced by a confirmation that receives focus.
 * If sending fails, everything typed stays in place.
 */
const FIELD_LABELS: Record<keyof FieldErrors, string> = {
  name: "Name",
  email: "Work email",
  company: "Company",
  topic: "Topic",
  message: "Message",
  consent: "Consent",
};
const FIELD_IDS: Record<keyof FieldErrors, string> = {
  name: "cf-name",
  email: "cf-email",
  company: "cf-company",
  topic: "cf-topic",
  message: "cf-message",
  consent: "cf-consent",
};

export function ContactForm() {
  const [topic, setTopic] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed" | "limited">("idle");
  const summary = useRef<HTMLDivElement>(null);
  const done = useRef<HTMLDivElement>(null);
  const failure = useRef<HTMLDivElement>(null);

  // Read ?topic= after mount, not via useSearchParams, so the form is in the static HTML (no layout shift, works without JS).
  useEffect(() => {
    const preset = topicFromQuery(new URLSearchParams(window.location.search).get("topic"));
    if (preset) setTopic(TOPICS.find((t) => t.id === preset)!.label);
  }, []);

  useEffect(() => {
    if (status === "sent") done.current?.focus();
    if (status === "failed" || status === "limited") failure.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const input = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      topic: TOPICS.find((t) => t.label === data.get("topic"))?.id ?? "",
      clouds: data.getAll("cloud").map(String),
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
    };
    const found = validateContact(input);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus("idle");
      requestAnimationFrame(() => document.getElementById("cf-errors")?.focus());
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (res.ok) return setStatus("sent");
      if (res.status === 422) {
        const body = await res.json().catch(() => ({}));
        setErrors(body.fields ?? {});
        setStatus("idle");
        requestAnimationFrame(() => document.getElementById("cf-errors")?.focus());
        return;
      }
      setStatus(res.status === 429 ? "limited" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div ref={done} tabIndex={-1} className={s.panel}>
        <Notice tone="good" title="Message sent.">
          <p>We have your message and will reply by email.</p>
        </Notice>
      </div>
    );
  }

  const summaryItems = (Object.keys(errors) as (keyof FieldErrors)[]).map((k) => ({
    fieldId: FIELD_IDS[k],
    message: `${FIELD_LABELS[k]}: ${errors[k]}`,
  }));

  return (
    // method="post": a submit before hydration (or without JS) must never put personal data in the URL.
    <form method="post" action="/api/contact" className={`${formClass} ${s.panel}`} onSubmit={onSubmit} noValidate aria-labelledby="cf-title">
      <h2 id="cf-title" className={s.panelTitle}>
        Send us a message
      </h2>
      <p className={s.panelNote}>All fields are required unless marked optional.</p>
      <div ref={summary}>
        <ErrorSummary id="cf-errors" errors={summaryItems} />
      </div>
      {(status === "failed" || status === "limited") && (
        <div ref={failure} tabIndex={-1}>
          <Notice tone="bad" title="Your message was not sent.">
            <p>
              {status === "limited"
                ? "Too many messages were sent from your connection. Please try again in a few minutes."
                : "Something went wrong on our side. Your text is still here; please try again in a few minutes."}
            </p>
          </Notice>
        </div>
      )}
      <FormRow>
        <TextField id="cf-name" name="name" label="Name" autoComplete="name" error={errors.name} />
        <TextField id="cf-email" name="email" type="email" label="Work email" autoComplete="email" error={errors.email} />
      </FormRow>
      <FormRow>
        <TextField id="cf-company" name="company" label="Company" autoComplete="organization" error={errors.company} />
        <SelectField
          id="cf-topic"
          name="topic"
          label="Topic"
          placeholder="Select a topic"
          options={TOPICS.map((t) => t.label)}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          error={errors.topic}
        />
      </FormRow>
      <CheckboxGroup legend="Clouds in use" optional>
        {CLOUDS.map((c) => (
          <Checkbox key={c.id} name="cloud" value={c.id}>
            {c.label}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <TextareaField
        id="cf-message"
        name="message"
        label="Message"
        help="Please do not include passwords, keys or regulated data."
        error={errors.message}
      />
      {/* Honeypot: hidden from people and assistive technology, filled in by bots. */}
      <div className={s.trap} aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <Checkbox id="cf-consent" name="consent" aria-describedby={errors.consent ? "cf-consent-error" : undefined}>
          I agree that AlgoCrew may use these details to reply to me, as described in the{" "}
          <a href="/privacy-policy">privacy policy</a>.
        </Checkbox>
        {errors.consent && (
          <p className={s.consentError} id="cf-consent-error">
            {errors.consent}
          </p>
        )}
      </div>
      <div>
        <Button type="submit" arrow>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
