import type Stripe from "stripe";

/**
 * Persist an order after successful payment.
 * Replace the console.log stub below with your preferred storage
 * (e.g. a database insert, an email notification, or a third-party service).
 */
export async function saveOrder(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const order = {
    id: session.id,
    customerEmail: session.customer_details?.email ?? null,
    customerName: session.customer_details?.name ?? null,
    shippingAddress:
      session.collected_information?.shipping_details?.address ?? null,
    shippingName: session.collected_information?.shipping_details?.name ?? null,
    amountTotal: session.amount_total,
    currency: session.currency,
    paymentStatus: session.payment_status,
    createdAt: new Date().toISOString(),
  };

  // TODO: replace with real persistence
  console.log("[order]", JSON.stringify(order));
}
