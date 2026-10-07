import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/constants";

const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-IP throttle. Serverless instances don't share memory,
// so this only blunts bursts; the honeypot handles most bots.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function field(body: Record<string, unknown>, key: string) {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never see or fill this field
  if (field(body, "company")) {
    return NextResponse.json({ ok: true });
  }

  const name = field(body, "name");
  const email = field(body, "email");
  const message = field(body, "message");

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in every field." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (name.length > LIMITS.name || message.length > LIMITS.message) {
    return NextResponse.json(
      { error: "Your message is too long." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages — please try again later." },
      { status: 429 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // onboarding@resend.dev works without a verified domain, but can only
    // deliver to the Resend account owner's address
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? siteConfig.email,
    replyTo: email,
    subject: `Portfolio message from ${name.replace(/[\r\n]+/g, " ")}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#111">
        <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 16px"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return NextResponse.json(
      { error: "Could not send your message. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
