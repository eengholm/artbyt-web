"use client";

import Link from "next/link";
import { useCart } from "@/app/_components/shop/cart-context";

export default function CartLink() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/shop/cart"
      className="text-sm text-black hover:opacity-50 transition-opacity"
    >
      Varukorg{totalItems > 0 ? ` (${totalItems})` : ""}
    </Link>
  );
}
