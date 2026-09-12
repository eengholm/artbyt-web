import { NextRequest, NextResponse } from "next/server";
import { cancelGelatoOrder } from "@/lib/gelato";
import { getOrderMetadata, markWithdrawn } from "@/lib/order-status";
import { getStripe } from "@/lib/stripe";

const WITHDRAWAL_WINDOW_MS = 14 * 24 * 60 * 60 * 1000; // 14 days, Distansavtalslagen 2 kap. 2 §
const SAFE_SESSION_ID = /^cs_[a-zA-Z0-9_]+$/;

/**
 * The self-service "ångerknapp" required by 2 kap. 10 a § Distansavtalslagen
 * (in force since 2026-06-19). Stripe's Checkout Session is the order record
 * (no application database) — the customer identifies their order with the
 * session id from their confirmation invoice/e-mail plus their own e-mail
 * address, and a refund is issued through Stripe's own refunds API.
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan" }, { status: 400 });
  }

  const { sessionId, email } = body as { sessionId?: string; email?: string };

  if (typeof sessionId !== "string" || !SAFE_SESSION_ID.test(sessionId)) {
    return NextResponse.json({ error: "Ogiltigt ordernummer" }, { status: 400 });
  }
  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Ogiltig e-postadress" }, { status: 400 });
  }

  const stripe = getStripe();
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ error: "Hittade ingen order med det ordernumret" }, { status: 404 });
  }

  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Ordern är inte betald" }, { status: 400 });
  }

  const orderEmail = session.customer_details?.email?.trim().toLowerCase();
  if (!orderEmail || orderEmail !== email.trim().toLowerCase()) {
    return NextResponse.json(
      { error: "E-postadressen stämmer inte med ordern" },
      { status: 403 },
    );
  }

  const ageMs = Date.now() - session.created * 1000;
  if (ageMs > WITHDRAWAL_WINDOW_MS) {
    return NextResponse.json(
      { error: "Ångerfristen på 14 dagar har gått ut för denna order" },
      { status: 400 },
    );
  }

  const piId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;
  if (!piId) {
    return NextResponse.json({ error: "Ordern saknar betalningsuppgifter" }, { status: 400 });
  }

  const existing = await getOrderMetadata(piId);
  if (existing.withdrawal_status === "refunded") {
    // Idempotent: the customer can resubmit/refresh without a second refund.
    return NextResponse.json({
      orderRef: session.id,
      requestedAt: existing.withdrawal_requested_at,
      refundId: existing.refund_id,
    });
  }

  const refund = await stripe.refunds.create({
    payment_intent: piId,
    reason: "requested_by_customer",
  });

  if (existing.gelato_order_id) {
    await cancelGelatoOrder(existing.gelato_order_id); // best-effort, order may already be in production
  }

  await markWithdrawn(piId, refund.id);

  return NextResponse.json({
    orderRef: session.id,
    requestedAt: new Date().toISOString(),
    refundId: refund.id,
  });
}
