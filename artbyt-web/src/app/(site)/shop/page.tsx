import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/api";
import { Metadata } from "next";
import CartLink from "@/app/_components/shop/cart-link";

export const metadata: Metadata = {
  title: "Butik",
  description: "Köp prints och designprodukter från Tim Bylander.",
};

export const revalidate = 3600;

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <main>
      <div className="relative mb-6">
        <hr className="border-t border-gray-200" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white pl-3">
          <CartLink />
        </div>
      </div>
      {products.length === 0 ? (
        <p className="text-sm text-black">
          Inga produkter tillgängliga just nu.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden bg-white mb-3">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain group-hover:opacity-90 transition-opacity"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    className="w-full h-full bg-gray-200"
                    aria-hidden="true"
                  />
                )}
              </div>
              <p className="text-sm font-medium">{product.title}</p>
              <p className="text-sm text-gray-600 mt-0.5">
                {product.price.toLocaleString("sv-SE")} kr
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
