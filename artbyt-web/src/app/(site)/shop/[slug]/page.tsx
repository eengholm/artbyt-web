import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getProductBySlug, getAllProducts } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import AddToCartButton from "./add-to-cart";
import CartLink from "@/app/_components/shop/cart-link";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.title, description: product.excerpt };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || !product.active) notFound();

  const descriptionHtml = await markdownToHtml(product.description || "");

  return (
    <main className="px-4 pl-36">
      <div className="flex items-center justify-between mb-6">
        <hr className="flex-1 border-t border-gray-200" />
        <div className="ml-4 shrink-0">
          <CartLink />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="relative w-full md:w-1/2 aspect-square overflow-hidden bg-white shrink-0">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200" aria-hidden="true" />
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-lg font-medium">{product.title}</h1>
          <p className="mt-1 text-sm">
            {product.price.toLocaleString("sv-SE")} kr
          </p>

          {descriptionHtml && (
            <div
              className="mt-4 text-sm text-black leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          )}

          <AddToCartButton slug={product.slug} />

          <div className="mt-6">
            <Link
              href="/shop"
              className="block mt-1 text-sm text-gray-500 hover:text-black transition-colors"
            >
              ← Tillbaka till butiken
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
