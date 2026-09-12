# Shop Setup Guide

The shop uses **Stripe** as the product catalog and payments source of truth, and **Gelato** purely for print production/fulfillment after an order is paid. Gelato is **never** queried for products or prices.

## Architecture

```
Customer
  │  /shop → Stripe products (via API, cached 1h)
  │  /shop/[slug] → Stripe product + size metadata
  │  "Lägg i varukorg" → localStorage cart (client-side)
  │  "Gå till kassan" → POST /api/checkout
  ▼
Stripe Checkout Session   (prices from product.metadata.sizes[].price, SEK)
  │  Stripe collects payment + shipping address
  │  success → /success?session_id=...
  ▼
✅ checkout.session.completed  webhook  →  POST /api/webhooks/stripe
  ▼
createGelatoOrder(sessionId)  →  Gelato order.gelatoapis.com/v4/orders
```

## Environment Variables

| Variable | Used for |
| --- | --- |
| `STRIPE_SECRET_KEY` | Listing products, creating checkout sessions, webhook verification |
| `STRIPE_WEBHOOK_SECRET` | Verifying `checkout.session.completed` webhook signatures |
| `GELATO_API_KEY` | Authenticating order + shipment-method requests to Gelato |
| `NEXT_PUBLIC_SITE_URL` | Base URL for Stripe success/cancel URLs (defaults to `http://localhost:3000`) |

## Products (Stripe = source of truth)

- Products are fetched from Stripe: `stripe.products.list({ active: true, expand: ["data.default_price"] })` (`src/lib/api.ts`).
- Each product's Stripe **product ID** is used as the site `slug`, so slug must be URL-safe (only `[a-zA-Z0-9_-]`).
- Product image: Stripe product image(s); first image is used.
- Display price falls back to the default price for single-size products.

### Product metadata

Set these metadata fields on the Stripe product:

**`sizes`** (required) — JSON array of per-size config:

```json
[
  { "name": "A4", "price": 39900, "gelato": "gelato-product-uid-xyz" },
  { "name": "A3", "price": 49900, "gelato": "gelato-product-uid-abc" }
]
```

- `name` — displayed size label on the product page (must match exactly what's added to the cart).
- `price` — price in **cents (SEK)**, used in checkout line items.
- `gelato` — the Gelato **productUid** that fulfills this size (from Gelato dashboard/API).
- `shipping` (optional) — currently read by code but not used in checkout.

**`gelato_image_url`** (optional) — overrides which image Gelato prints on. Falls back to the Stripe product image.

### Adding a product

1. Create a product in the Stripe dashboard with a name, description, and image.
2. Set a default price (used as fallback display price).
3. Add the `sizes` JSON metadata above and optionally `gelato_image_url`.
4. Activate the product — inactive products are filtered out and appear as "not found".

Gelato products themselves are managed in the Gelato dashboard; you only need their `productUid`, which you paste into the `sizes` metadata.

## Cart & Checkout

- Cart is stored in `localStorage` under `artbyt_cart` (client-side, no backend). Quantity is capped at 100/line and 20 lines total.
- `POST /api/checkout` (`src/app/api/checkout/route.ts`):
  1. Re-validates every item against Stripe products and their `sizes` metadata.
  2. Builds Stripe line items using `sizeConfig.price` (SEK).
  3. Creates a Checkout Session with `mode: "payment"`, fixed SEK 49 shipping ("Standardfrakt", 3–7 business days), and shipping collection for `SE, NO, DK, FI, DE, NL, GB, US`.
  4. Stores the cart (`[{ slug, size, quantity }]`) in `session.metadata.items`.
  5. Redirects to Stripe; returns to `/success?session_id=...` on success.

## Fulfillment (Gelato)

`createGelatoOrder(sessionId)` (`src/lib/gelato.ts`) runs on the Stripe webhook:

1. **Retrieve** the Stripe Checkout Session to get `metadata.items` and the collected shipping address.
2. **For each item**: fetch the Stripe product and resolve the chosen size to a Gelato `productUid` via `sizes[].gelato`.
3. **Shipment method**: query `shipment.gelatoapis.com/v1/shipment-methods?country=<country>` and prefer a `normal` method with tracking; fall back to `"normal"` on failure.
4. **Create order**: `POST order.gelatoapis.com/v4/orders` with item references (`productId|size`), files (the print image URL), quantity, shipment method, and shipping address.

The webhook handler (`src/app/api/webhooks/stripe/route.ts`) verifies the signature with `STRIPE_WEBHOOK_SECRET` and dedupes sessions (memory map, 1h TTL) to avoid double-firing, e.g. on retries.

## Local Testing

1. Set the env vars above (Stripe test keys, Gelato test key).
2. Forward Stripe webhooks locally:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   Copy the printed webhook secret into `STRIPE_WEBHOOK_SECRET`.
3. Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` and run `yarn dev`.
4. Add to cart → checkout → pay with Stripe test card `4242 4242 4242 4242` → the webhook fires `createGelatoOrder`.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Product missing from `/shop` | Product inactive in Stripe, or no `default_price` |
| "Invalid size" at checkout | `sizes` metadata doesn't include the selected size name |
| 400 at webhook | Wrong `STRIPE_WEBHOOK_SECRET` (or Stripe test/live mismatch) |
| "No items in session metadata" | Items saved to a different session/browser; metadata missing |
| "Size not found on product" | Gelato `productUid` missing/typo'd in `sizes` metadata |

## Key Files

- `src/lib/stripe.ts` — shared Stripe client singleton
- `src/lib/api.ts` — product fetching + Stripe → `Product` mapping
- `src/app/api/checkout/route.ts` — creates Checkout Sessions
- `src/app/api/webhooks/stripe/route.ts` — payment-confirmation webhook
- `src/lib/gelato.ts` — Gelato order fulfillment
- `src/app/_components/shop/cart-context.tsx` — client-side cart state