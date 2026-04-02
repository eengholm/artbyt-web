export interface Product {
  slug: string;
  title: string;
  /** Markdown body content */
  description: string;
  excerpt: string;
  image: string;
  /** Price in SEK (display only — Stripe controls actual charge via stripePriceId) */
  price: number;
  stripePriceId: string;
  active: boolean;
}
