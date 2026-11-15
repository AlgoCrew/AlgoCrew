import { NextResponse } from "next/server";
import { CLOUDS, type ContactInput, TOPICS, validateContact } from "@/resources/contact";

/**
 * Contact form delivery (roadmap T8.06, decision I-01): validation, a honeypot and a rate limit
 * on the server, then delivery through the EmailJS REST API.
 *
 * Configuration lives in environment variables only (see .env.example). Without it the route
 * answers 503 and the form keeps the visitor's text so nothing is lost.
 * EmailJS must allow API calls from non-browser applications (account security settings).
 */
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
// shortcut: per-instance memory, so the limit resets on cold start and is not shared between instances; move to a shared store (e.g. Upstash, Vercel KV) if spam gets through.
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear(); // bound memory
  return recent.length > LIMIT;
}

export async function POST(request: Request) {
  let body: Partial<ContactInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Bots that fill the hidden field get a normal-looking success and nothing is sent.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const input: ContactInput = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    company: String(body.company ?? "").trim(),
    topic: String(body.topic ?? ""),
    clouds: Array.isArray(body.clouds) ? body.clouds.filter((c): c is string => CLOUDS.some((x) => x.id === c)) : [],
    message: String(body.message ?? "").trim(),
    consent: body.consent === true,
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "invalid", fields: errors }, { status: 422 });
  }

  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY, CONTACT_TO_EMAIL } = process.env;
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !CONTACT_TO_EMAIL) {
    console.error("[contact] not configured: set the EMAILJS_* and CONTACT_TO_EMAIL environment variables");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const topic = TOPICS.find((t) => t.id === input.topic)?.label ?? input.topic;
  const clouds = input.clouds.map((id) => CLOUDS.find((c) => c.id === id)?.label ?? id).join(", ") || "Not given";
  // Field names match the existing EmailJS admin template.
  const templateParams = {
    from_name: input.name,
    from_email: input.email,
    to_email: CONTACT_TO_EMAIL,
    subject: `Website enquiry: ${topic} (${input.company})`,
    message: `Company: ${input.company}\nTopic: ${topic}\nClouds in use: ${clouds}\n\n${input.message}`,
    time: new Date().toISOString(),
  };

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: templateParams,
      }),
    });
    if (!res.ok) {
      console.error("[contact] EmailJS rejected the message:", res.status, await res.text());
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] EmailJS request failed:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
