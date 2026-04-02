"use client";

import { useEffect } from "react";
import { useCart } from "@/app/_components/shop/cart-context";

/** Clears the local cart once the success page mounts after payment. */
export default function SuccessView() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
