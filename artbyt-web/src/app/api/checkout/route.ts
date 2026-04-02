import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getProductBySlug } from "@/lib/api";
import { getStripe } from "@/lib/stripe";

// Only allow slug characters to prevent path traversal
const SAFE_SLUG = /^[a-z0-9-]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { items } = body as { items?: { slug: string; quantity: number }[] };

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  // Validate each item before touching the filesystem
  for (const item of items) {
    if (typeof item.slug !== "string" || !SAFE_SLUG.test(item.slug)) {
      return NextResponse.json({ error: "Invalid item" }, { status: 400 });
    }
    if (
      typeof item.quantity !== "number" ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 100
    ) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }
  }

  // Build Stripe line_items using server-side content (never trust client price IDs)
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const { slug, quantity } of items) {
    const product = getProductBySlug(slug);
    if (!product || !product.active) {
      return NextResponse.json(
        { error: `Product not found: ${slug}` },
        { status: 400 },
      );
    }
    if (!product.stripePriceId) {
      return NextResponse.json(
        { error: `Product not configured: ${slug}` },
        { status: 400 },
      );
    }
    lineItems.push({ price: product.stripePriceId, quantity });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json(
      { error: "Could not create checkout session" },
      { status: 500 },
    );
  }
}
