/**
 * Paddle webhook handler.
 * Verifies the Paddle-Signature header and processes transaction events.
 * See: https://developer.paddle.com/webhooks/overview
 */
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("Paddle-Signature") ?? "";

  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("PADDLE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  // Verify HMAC-SHA256 signature
  const isValid = await verifyPaddleSignature(rawBody, signature, secret);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = event.event_type as string;
  console.log(`[Paddle webhook] ${eventType}`);

  // Handle the events your app cares about
  switch (eventType) {
    case "transaction.completed":
      // Payment confirmed — booking record already created by the client
      // You could look up the booking by custom_data.bookingId and mark it paid
      break;
    case "transaction.payment_failed":
      // Notify customer or cancel the pending booking
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

async function verifyPaddleSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string
): Promise<boolean> {
  try {
    // Paddle signature format: ts=<timestamp>;h1=<hmac>
    const parts = Object.fromEntries(
      signatureHeader.split(";").map((p) => p.split("=") as [string, string])
    );
    const { ts, h1 } = parts;
    if (!ts || !h1) return false;

    const payload = `${ts}:${rawBody}`;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    const computed = Array.from(new Uint8Array(mac))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return computed === h1;
  } catch {
    return false;
  }
}
