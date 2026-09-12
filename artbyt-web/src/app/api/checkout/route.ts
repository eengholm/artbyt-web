import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/api";
import { getStripe } from "@/lib/stripe";
import { SHIPPING_COST_ORE, SHIPPING_ESTIMATE_DAYS, SHIPPING_LABEL } from "@/lib/shipping";

const SAFE_SLUG = /^[a-zA-Z0-9_-]+$/;
const SAFE_SIZE = /^[a-zA-Z0-9 _-]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { items } = body as {
    items?: { slug: string; size: string; quantity: number }[];
  };

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  if (items.length > 20) {
    return NextResponse.json({ error: "Too many items" }, { status: 400 });
  }

  for (const item of items) {
    if (typeof item.slug !== "string" || !SAFE_SLUG.test(item.slug)) {
      return NextResponse.json({ error: "Invalid item" }, { status: 400 });
    }
    if (typeof item.size !== "string" || !SAFE_SIZE.test(item.size)) {
      return NextResponse.json({ error: "Invalid size" }, { status: 400 });
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

  const lineItems: {
    price_data: {
      currency: string;
      product_data: { name: string };
      unit_amount: number;
      tax_behavior: "inclusive";
    };
    quantity: number;
  }[] = [];

  for (const { slug, size, quantity } of items) {
    const product = await getProductBySlug(slug);
    if (!product || !product.active) {
      return NextResponse.json(
        { error: `Product not found: ${slug}` },
        { status: 400 },
      );
    }

    const sizeConfig = product.sizes.find((s) => s.name === size);
    if (!sizeConfig) {
      return NextResponse.json(
        { error: `Invalid size "${size}" for ${slug}` },
        { status: 400 },
      );
    }

    lineItems.push({
      price_data: {
        currency: "sek",
        product_data: {
          name: `${product.title} — ${size}`,
        },
        unit_amount: sizeConfig.price,
        // Swedish consumer prices are shown VAT-inclusive; tells Stripe Tax
        // the unit_amount above already contains VAT rather than excluding it.
        tax_behavior: "inclusive",
      },
      quantity,
    });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      metadata: {
        items: JSON.stringify(
          items.map((i) => ({ slug: i.slug, size: i.size, quantity: i.quantity })),
        ),
      },
      shipping_address_collection: {
        allowed_countries: ["SE", "NO", "DK", "FI", "DE", "NL", "GB", "US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: SHIPPING_COST_ORE, currency: "sek" },
            display_name: SHIPPING_LABEL,
            tax_behavior: "inclusive",
            delivery_estimate: {
              minimum: { unit: "business_day", value: SHIPPING_ESTIMATE_DAYS.min },
              maximum: { unit: "business_day", value: SHIPPING_ESTIMATE_DAYS.max },
            },
          },
        },
      ],
      // Requires Stripe Tax to be activated and an origin address set under
      // https://dashboard.stripe.com/settings/tax before this has any effect.
      automatic_tax: { enabled: true },
      // Requires a terms-of-service URL under
      // https://dashboard.stripe.com/settings/public (point it at /villkor).
      consent_collection: { terms_of_service: "required" },
      // Generates and emails a legally-adequate order confirmation (see
      // invoice_data below) instead of relying on a custom mailer.
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: "Orderbekräftelse",
          footer:
            "Du har rätt att ångra ditt köp inom 14 dagar. Läs mer och ångra ditt köp på " +
            `${siteUrl}/retur-angerratt och ${siteUrl}/angra-kop.`,
        },
      },
      locale: "sv",
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
