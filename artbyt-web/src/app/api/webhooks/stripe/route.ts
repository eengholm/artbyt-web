import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { createGelatoOrder } from "@/lib/gelato";
import { getStripe } from "@/lib/stripe";

const processed = new Map<string, number>();
const PRUNE_AFTER_MS = 60 * 60 * 1000; // 1 hour

function isDuplicate(sessionId: string): boolean {
  const now = Date.now();
  if (processed.has(sessionId)) return true;

  if (processed.size > 1000) {
    for (const [id, ts] of processed) {
      if (now - ts > PRUNE_AFTER_MS) processed.delete(id);
    }
  }

  processed.set(sessionId, now);
  return false;
}

export async function POST(req: NextRequest) {
  const body = await req.text(); // raw body needed for signature verification
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 },
    );
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("[webhook] signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.id && isDuplicate(session.id)) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    await createGelatoOrder(session.id);
  }

  return NextResponse.json({ received: true });
}
