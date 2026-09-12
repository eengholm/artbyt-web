import { Metadata } from "next";
import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { SiteFooter } from "@/app/_components/layout/site-footer";
import SuccessView from "./success-view";

export const metadata: Metadata = {
  title: "Beställning mottagen",
};

type CartItemMeta = { slug: string; size: string; quantity: number };

async function getOrderSummary(sessionId: string | undefined) {
  if (!sessionId || !sessionId.startsWith("cs_")) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return null;

    let items: CartItemMeta[] = [];
    try {
      items = JSON.parse(session.metadata?.items ?? "[]");
    } catch {
      items = [];
    }

    return {
      orderRef: session.id,
      amountTotal: session.amount_total,
      currency: session.currency,
      items,
    };
  } catch {
    return null;
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const order = await getOrderSummary(session_id);

  return (
    <main className="flex flex-col items-center text-center pt-16">
      <hr className="border-t border-gray-200 mb-6" />
      <SuccessView />
      <h1 className="text-sm text-black mb-3">Tack för din beställning!</h1>
      <p className="text-sm text-gray-600 mb-6 max-w-sm leading-relaxed">
        Din betalning har mottagits. En orderbekräftelse med kvitto och
        ångerrättsinformation skickas till din e-post.
      </p>

      {order && (
        <div className="text-sm text-left border border-gray-200 px-5 py-4 mb-6 w-full max-w-sm">
          <p className="text-gray-500 text-xs mb-2">
            Order <span className="font-mono">{order.orderRef}</span>
          </p>
          <ul className="space-y-1 mb-2">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between text-gray-700">
                <span>
                  {item.slug} — {item.size} × {item.quantity}
                </span>
              </li>
            ))}
          </ul>
          {typeof order.amountTotal === "number" && (
            <div className="flex justify-between font-medium border-t border-gray-100 pt-2">
              <span>Totalt (inkl. moms)</span>
              <span>
                {(order.amountTotal / 100).toLocaleString("sv-SE")}{" "}
                {order.currency?.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-gray-500 mb-6 max-w-sm leading-relaxed">
        Ändrat dig? Du kan{" "}
        <Link href="/angra-kop" className="underline hover:text-black">
          ångra ditt köp
        </Link>{" "}
        inom 14 dagar. Läs mer om{" "}
        <Link href="/retur-angerratt" className="underline hover:text-black">
          returer och ångerrätt
        </Link>
        .
      </p>

      <Link
        href="/shop"
        className="text-sm text-black underline hover:opacity-50 transition-opacity"
      >
        Fortsätt handla
      </Link>
      <div className="w-full max-w-sm">
        <SiteFooter />
      </div>
    </main>
  );
}
