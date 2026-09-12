"use client";

import { useCart } from "@/app/_components/shop/cart-context";
import { ProductSize } from "@/interfaces/product";
import { useState } from "react";

export default function AddToCartButton({
  slug,
  sizes,
}: {
  slug: string;
  sizes: ProductSize[];
}) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    sizes.length > 0 ? sizes[0].name : "",
  );
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(slug, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (sizes.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex gap-2 mb-4">
        {sizes.map((s) => (
          <button
            key={s.name}
            onClick={() => setSelectedSize(s.name)}
            className={`text-sm py-2 px-4 border transition-colors ${
              selectedSize === s.name
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:border-black"
            }`}
          >
            {s.name} — {Math.round(s.price / 100).toLocaleString("sv-SE")} kr
          </button>
        ))}
      </div>

      <button
        onClick={handleClick}
        className="bg-black text-white text-sm py-3 px-8 hover:opacity-70 transition-opacity"
      >
        {added ? "Tillagd ✓" : "Lägg i varukorg"}
      </button>
    </div>
  );
}
