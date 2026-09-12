/**
 * Single source of truth for shipping cost/estimate so the checkout session,
 * cart summary, and product pages can never drift out of sync.
 */
export const SHIPPING_COST_ORE = 4900; // 49.00 SEK, in Stripe's smallest currency unit
export const SHIPPING_COST_SEK = SHIPPING_COST_ORE / 100;
export const SHIPPING_LABEL = "Standardfrakt";
export const SHIPPING_ESTIMATE_DAYS = { min: 3, max: 7 };
export const SHIPPING_ESTIMATE_TEXT = `${SHIPPING_ESTIMATE_DAYS.min}–${SHIPPING_ESTIMATE_DAYS.max} arbetsdagar`;

/** Short line shown near prices on product/shop pages. */
export const SHIPPING_SHORT_NOTE = `Frakt ${SHIPPING_COST_SEK} kr · ${SHIPPING_ESTIMATE_TEXT}`;

/** Assumes Swedish B2C prices are VAT-inclusive — confirm with an accountant. */
export const PRICE_VAT_NOTE = "inkl. moms";
