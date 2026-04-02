import { Metadata } from "next";
import { getAllProducts } from "@/lib/api";
import CartView from "./cart-view";

export const metadata: Metadata = {
  title: "Varukorg",
};

export default function CartPage() {
  // Pass a lean product summary to the client component so it can
  // display titles and compute totals without a client-side API call.
  const products = getAllProducts().map(({ slug, title, price, image }) => ({
    slug,
    title,
    price,
    image,
  }));

  return (
    <main className="px-4 pl-28 md:pl-36 md:px-8 py-8">
      <hr className="border-t border-gray-200 mb-3" />
      <h1 className="text-sm text-black mb-6">Varukorg</h1>
      <CartView products={products} />
    </main>
  );
}
