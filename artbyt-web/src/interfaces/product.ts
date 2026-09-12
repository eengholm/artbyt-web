export interface ProductSize {
  name: string;
  price: number;
  gelato: string;
  shipping?: string;
}

export interface Product {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  price: number;
  stripePriceId: string;
  active: boolean;
  sizes: ProductSize[];
}
