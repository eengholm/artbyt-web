"use client";

import { useCart } from "@/app/_components/shop/cart-context";
import { useState } from "react";

export default function AddToCartButton({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleClick}
      className="mt-6 bg-black text-white text-sm py-3 px-8 hover:opacity-70 transition-opacity"
    >
      {added ? "Tillagd ✓" : "Lägg i varukorg"}
    </button>
  );
}
