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

/** Reads the JSON the form script sends, or the plain form post a browser sends without JavaScript. */
async function readBody(request: Request): Promise<Partial<ContactInput> | null> {
  const type = request.headers.get("content-type") ?? "";
  try {
    if (type.includes("application/json")) return await request.json();
    if (!type.includes("form")) return null;
    const data = await request.formData();
    const label = String(data.get("topic") ?? "");
    return {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      topic: TOPICS.find((t) => t.label === label)?.id ?? label, // the select submits labels
      clouds: data.getAll("cloud").map(String),
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
    };
  } catch {
    return null;
  }
}

/** What a visitor sees after a plain form post (JavaScript off, or a submit before the script loaded). */
const OUTCOME: Record<string, [title: string, text: string]> = {
  ok: ["Message sent.", "We have your message and will reply by email."],
  invalid: ["Your message was not sent.", "Some fields were missing or not valid. Go back, fill in every field, tick the consent box and send again."],
  rate_limited: ["Your message was not sent.", "Too many messages were sent from your connection. Please try again in a few minutes."],
};
const FAILED: [string, string] = ["Your message was not sent.", "Something went wrong on our side. Please go back and try again in a few minutes."];

function outcomePage(key: string, status: number) {
  const [title, text] = OUTCOME[key] ?? FAILED;
  const link = key === "ok" ? '<a href="/">Back to the home page</a>' : '<a href="/contact">Back to the contact form</a>';
  // Same look as the 410 page in src/middleware.ts.
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title} | AlgoCrew</title>
<style>body{margin:0;font:17px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif;color:#0b1220;background:#fff}main{max-width:640px;margin:0 auto;padding:96px 24px}h1{font-size:2.25rem;line-height:1.1;letter-spacing:-.02em;margin:0 0 16px}p{color:#414b5d}a{color:#1d4ed8;font-weight:600}</style></head>
<body><main><h1>${title}</h1><p>${text}</p><p>${link}</p></main></body></html>`;
  return new NextResponse(html, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export async function POST(request: Request) {
  const isFormPost = !(request.headers.get("content-type") ?? "").includes("application/json");
  // JSON for the form script; a readable page for a plain form post.
  const reply = (status: number, json: Record<string, unknown>) =>
    isFormPost ? outcomePage(status < 300 ? "ok" : String(json.error), status) : NextResponse.json(json, { status });

  const body = await readBody(request);
  if (!body) return reply(400, { error: "bad_request" });

  // Bots that fill the hidden field get a normal-looking success and nothing is sent.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return reply(200, { ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return reply(429, { error: "rate_limited" });
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
    return reply(422, { error: "invalid", fields: errors });
  }

  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY, CONTACT_TO_EMAIL } = process.env;
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !CONTACT_TO_EMAIL) {
    console.error("[contact] not configured: set the EMAILJS_* and CONTACT_TO_EMAIL environment variables");
    return reply(503, { error: "not_configured" });
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
      return reply(502, { error: "send_failed" });
    }
  } catch (err) {
    console.error("[contact] EmailJS request failed:", err);
    return reply(502, { error: "send_failed" });
  }

  return reply(200, { ok: true });
}
