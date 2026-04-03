import { SiteTitle, SiteNav } from "@/app/_components/layout/site-nav";
import { CartProvider } from "@/app/_components/shop/cart-context";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white pt-24 pb-8 px-4 md:pl-36 md:pr-4">
        <SiteTitle />
        <SiteNav />
        {children}
      </div>
    </CartProvider>
  );
}
