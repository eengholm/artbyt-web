import { Metadata } from "next";
import { SiteFooter } from "@/app/_components/layout/site-footer";
import WithdrawalForm from "./withdrawal-form";

export const metadata: Metadata = {
  title: "Ångra ditt köp",
  description: "Utöva din lagstadgade ångerrätt inom 14 dagar direkt här på webbplatsen.",
};

export default function WithdrawalPage() {
  return (
    <main className="max-w-md">
      <hr className="border-t border-gray-200 mb-6" />
      <h1 className="text-lg font-medium mb-2">Ångra ditt köp</h1>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        Du har rätt att ångra ditt köp inom 14 dagar från att du mottog varan,
        utan att ange något skäl. Fyll i ordernumret från din
        orderbekräftelse och den e-postadress du handlade med, så
        registrerar vi din ånger direkt och återbetalar hela beloppet. Läs
        mer om ångerrätt och reklamation på vår{" "}
        <a href="/retur-angerratt" className="underline hover:opacity-50">
          returer- och ångerrättssida
        </a>
        .
      </p>
      <WithdrawalForm />
      <SiteFooter />
    </main>
  );
}
