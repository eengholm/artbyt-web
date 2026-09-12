import Link from "next/link";
import { getGeneralSettings } from "@/lib/api";

const legalLinks = [
  { href: "/villkor", label: "Köpvillkor" },
  { href: "/integritetspolicy", label: "Integritetspolicy" },
  { href: "/retur-angerratt", label: "Returer och ångerrätt" },
  { href: "/angra-kop", label: "Ångra ditt köp" },
];

export function SiteFooter() {
  const settings = getGeneralSettings();

  return (
    <footer className="mt-16 pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-3">
      <div className="space-y-0.5">
        <p>{settings.businessName}</p>
        <p>{settings.orgNumber}</p>
        <p>{settings.address}</p>
        {settings.vatNumber && <p>Momsreg.nr: {settings.vatNumber}</p>}
        {settings.contactEmail && <p>{settings.contactEmail}</p>}
      </div>
      <nav className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Juridisk information">
        {legalLinks.map(({ href, label }) => (
          <Link key={href} href={href} className="hover:text-black transition-colors">
            {label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
