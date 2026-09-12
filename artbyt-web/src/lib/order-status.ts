import { getStripe } from "@/lib/stripe";

/**
 * There is no application database — Stripe's PaymentIntent is the system of
 * record for order/fulfilment state. Metadata on the PaymentIntent is
 * durable (survives redeploys/cold starts, unlike an in-memory map) and is
 * visible in the Stripe Dashboard, which doubles as a lightweight "order list"
 * without needing to run and maintain our own database.
 */

export type FulfillmentStatus = "fulfilled" | "failed";
export type WithdrawalStatus = "refunded";

type OrderMetadata = {
  fulfillment_status?: FulfillmentStatus;
  fulfillment_error?: string;
  gelato_order_id?: string;
  withdrawal_status?: WithdrawalStatus;
  withdrawal_requested_at?: string;
  refund_id?: string;
};

export async function getOrderMetadata(
  paymentIntentId: string,
): Promise<OrderMetadata> {
  const pi = await getStripe().paymentIntents.retrieve(paymentIntentId);
  return pi.metadata as OrderMetadata;
}

export async function markFulfilled(
  paymentIntentId: string,
  gelatoOrderId: string,
): Promise<void> {
  await getStripe().paymentIntents.update(paymentIntentId, {
    metadata: { fulfillment_status: "fulfilled", gelato_order_id: gelatoOrderId },
  });
}

export async function markFulfillmentFailed(
  paymentIntentId: string,
  error: string,
): Promise<void> {
  await getStripe().paymentIntents.update(paymentIntentId, {
    metadata: {
      fulfillment_status: "failed",
      // Truncated: metadata values are capped at 500 chars and must never
      // carry customer PII (see the compliance audit's logging finding).
      fulfillment_error: error.slice(0, 480),
    },
  });
}

export async function markWithdrawn(
  paymentIntentId: string,
  refundId: string,
): Promise<void> {
  await getStripe().paymentIntents.update(paymentIntentId, {
    metadata: {
      withdrawal_status: "refunded",
      withdrawal_requested_at: new Date().toISOString(),
      refund_id: refundId,
    },
  });
}
