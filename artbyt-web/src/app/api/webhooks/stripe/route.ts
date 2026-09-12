import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { cancelGelatoOrder, createGelatoOrder } from "@/lib/gelato";
import { getOrderMetadata, markFulfillmentFailed, markFulfilled, markWithdrawn } from "@/lib/order-status";
import { getStripe } from "@/lib/stripe";

function paymentIntentId(pi: string | Stripe.PaymentIntent | null): string | null {
  if (!pi) return null;
  return typeof pi === "string" ? pi : pi.id;
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const piId = paymentIntentId(session.payment_intent);
  if (!piId) {
    console.error("[webhook] session has no payment_intent:", session.id);
    return;
  }

  // Durable idempotency check: the PaymentIntent's own metadata (not an
  // in-memory map) survives redeploys and is shared across every instance,
  // so a Stripe webhook retry can never trigger a second Gelato order.
  const existing = await getOrderMetadata(piId);
  if (existing.fulfillment_status) {
    return;
  }

  try {
    const { gelatoOrderId } = await createGelatoOrder(session.id);
    await markFulfilled(piId, gelatoOrderId);
  } catch (err) {
    // The customer has already been charged at this point — record the
    // failure on the PaymentIntent (queryable in the Stripe Dashboard via
    // metadata search) instead of letting it disappear silently.
    console.error("[webhook] Gelato fulfilment failed for session:", session.id, err);
    await markFulfillmentFailed(piId, err instanceof Error ? err.message : String(err));
  }
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  const piId = paymentIntentId(charge.payment_intent);
  if (!piId) return;

  const existing = await getOrderMetadata(piId);
  if (existing.withdrawal_status === "refunded") return; // already handled via /api/withdrawals

  if (existing.gelato_order_id) {
    await cancelGelatoOrder(existing.gelato_order_id); // best-effort
  }

  const refundId = charge.refunds?.data?.[0]?.id ?? charge.id;
  await markWithdrawn(piId, refundId);
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

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;
    case "charge.refunded":
      await handleChargeRefunded(event.data.object as Stripe.Charge);
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
