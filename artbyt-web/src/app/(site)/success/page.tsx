import { Metadata } from "next";
import Link from "next/link";
import SuccessView from "./success-view";

export const metadata: Metadata = {
  title: "Beställning mottagen",
};

export default function SuccessPage() {
  return (
    <main>
      <hr className="border-t border-gray-200 mb-6" />
      <SuccessView />
      <h1 className="text-sm text-black mb-3">Tack för din beställning!</h1>
      <p className="text-sm text-gray-600 mb-6 max-w-sm leading-relaxed">
        Din betalning har mottagits. Du kommer att få en bekräftelse via e-post.
      </p>
      <Link
        href="/shop"
        className="text-sm text-black underline hover:opacity-50 transition-opacity"
      >
        Fortsätt handla
      </Link>
    </main>
  );
}
