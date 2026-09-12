"use client";

import { useCart } from "@/app/_components/shop/cart-context";
import { ProductSize } from "@/interfaces/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SHIPPING_COST_SEK, SHIPPING_ESTIMATE_TEXT } from "@/lib/shipping";

type ProductSummary = {
  slug: string;
  title: string;
  price: number;
  image: string;
  sizes: ProductSize[];
};

export default function CartView({ products }: { products: ProductSummary[] }) {
  const { items, updateQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cartItems = items
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      if (!product) return null;
      const sizeConfig = product.sizes.find((s) => s.name === item.size);
      return { ...item, product, sizeConfig };
    })
    .filter((item): item is NonNullable<typeof item> => item != null);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.sizeConfig?.price ?? item.product.price * 100) * item.quantity / 100,
    0,
  );

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, size: i.size, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Något gick fel.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Nätverksfel – försök igen.");
    } finally {
      setLoading(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-sm text-black space-y-2">
        <p>Din varukorg är tom.</p>
        <Link
          href="/shop"
          className="underline hover:opacity-50 transition-opacity"
        >
          Fortsätt handla
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="divide-y divide-gray-100 border-t border-gray-200">
        {cartItems.map(({ slug, size, quantity, product, sizeConfig }) => (
          <div key={slug + "|" + size} className="flex items-start gap-4 py-4">
            {/* Thumbnail */}
            <Link href={`/shop/${slug}`} className="shrink-0">
              <div className="relative w-16 h-16 bg-gray-100 overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div
                    className="w-full h-full bg-gray-200"
                    aria-hidden="true"
                  />
                )}
              </div>
            </Link>

            {/* Title + size + price */}
            <div className="flex-1 min-w-0">
              <p className="text-sm">{product.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{size}</p>
              <p className="text-sm text-gray-500 mt-0.5">
                {((sizeConfig?.price ?? product.price * 100) / 100).toLocaleString("sv-SE")} kr
              </p>
            </div>

            {/* Qty + remove + line total */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="inline-flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(slug, size, quantity - 1)}
                  className="w-5 text-center text-sm hover:opacity-50 transition-opacity"
                  aria-label="Minska antal"
                >
                  −
                </button>
                <span className="text-sm">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, size, quantity + 1)}
                  className="w-5 text-center text-sm hover:opacity-50 transition-opacity"
                  aria-label="Öka antal"
                >
                  +
                </button>
              </div>
              <p className="text-sm font-medium">
                {(((sizeConfig?.price ?? product.price * 100) / 100) * quantity).toLocaleString("sv-SE")} kr
              </p>
              <button
                onClick={() => removeItem(slug, size)}
                className="text-xs text-gray-400 hover:text-black transition-colors"
                aria-label="Ta bort produkt"
              >
                Ta bort
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: inline summary */}
      <div className="hidden md:block mt-4 border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Delsumma</span>
          <span>{Math.round(total).toLocaleString("sv-SE")} kr</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            Frakt
            <span className="ml-1 text-xs text-gray-400">
              ({SHIPPING_ESTIMATE_TEXT})
            </span>
          </span>
          <span>{SHIPPING_COST_SEK} kr</span>
        </div>
        <div className="flex justify-between text-sm font-medium border-t border-gray-200 pt-2">
          <span>Totalt (inkl. moms)</span>
          <span>{Math.round(total + SHIPPING_COST_SEK).toLocaleString("sv-SE")} kr</span>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <p className="mt-4 text-xs text-gray-500 leading-relaxed">
          Genom att gå vidare till kassan godkänner du våra{" "}
          <Link href="/villkor" className="underline hover:text-black">
            köpvillkor
          </Link>{" "}
          och tar del av din{" "}
          <Link href="/retur-angerratt" className="underline hover:text-black">
            14 dagars ångerrätt
          </Link>
          .
        </p>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-4 w-full bg-black text-white text-sm py-3 px-4 hover:opacity-70 transition-opacity disabled:opacity-40"
        >
          {loading ? "Laddar…" : "Gå till kassan"}
        </button>

        <div className="mt-4">
          <Link
            href="/shop"
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            ← Fortsätt handla
          </Link>
        </div>
      </div>

      {/* Mobile: sticky bottom panel */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Delsumma</span>
          <span>{Math.round(total).toLocaleString("sv-SE")} kr</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            Frakt
            <span className="ml-1 text-xs text-gray-400">
              ({SHIPPING_ESTIMATE_TEXT})
            </span>
          </span>
          <span>{SHIPPING_COST_SEK} kr</span>
        </div>
        <div className="flex justify-between text-sm font-medium border-t border-gray-100 pt-2">
          <span>Totalt (inkl. moms)</span>
          <span>{Math.round(total + SHIPPING_COST_SEK).toLocaleString("sv-SE")} kr</span>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <p className="text-xs text-gray-500 leading-relaxed">
          Genom att gå vidare till kassan godkänner du våra{" "}
          <Link href="/villkor" className="underline hover:text-black">
            köpvillkor
          </Link>{" "}
          och tar del av din{" "}
          <Link href="/retur-angerratt" className="underline hover:text-black">
            14 dagars ångerrätt
          </Link>
          .
        </p>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-black text-white text-sm py-3 px-4 hover:opacity-70 transition-opacity disabled:opacity-40"
        >
          {loading ? "Laddar…" : "Gå till kassan"}
        </button>
      </div>
    </div>
  );
}
