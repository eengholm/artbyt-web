import { Metadata } from "next";
import { getAllProducts } from "@/lib/api";
import { SiteFooter } from "@/app/_components/layout/site-footer";
import CartView from "./cart-view";

export const metadata: Metadata = {
  title: "Varukorg",
};

export default async function CartPage() {
  // Pass a lean product summary to the client component so it can
  // display titles and compute totals without a client-side API call.
  const products = (await getAllProducts()).map(
    ({ slug, title, price, image, sizes }) => ({
      slug,
      title,
      price: sizes.length > 0 ? Math.round(sizes[0].price / 100) : price,
      image,
      sizes,
    }),
  );

  return (
    <div className="flex flex-col min-h-[calc(100svh-6rem)]">
      <main className="px-4 md:pl-36 md:px-8 py-8">
        <div>
          <hr className="border-t border-gray-200 mb-3" />
          <h1 className="text-sm text-black mb-6">Varukorg</h1>
          <CartView products={products} />
        </div>
      </main>
      <div className="flex-1" />
      <SiteFooter className="-mx-4 md:-mx-8 px-4 md:px-8 mb-52 md:mb-0" />
    </div>
  );
}
