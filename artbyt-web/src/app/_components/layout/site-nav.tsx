"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Hem" },
  { href: "/assignments", label: "Projekt" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "Om Mig" },
  { href: "/shop", label: "Butik" },
];

export function SiteTitle() {
  return (
    <div className="fixed left-8 top-4 z-50">
      <Link href="/" className="hover:opacity-50 transition-opacity">
        <span className="text-lg font-normal tracking-wide text-black">
          Tim Bylander
        </span>
      </Link>
    </div>
  );
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-8 top-28 z-50 flex flex-col gap-0">
      {navItems.map(({ href, label }) => {
        const isActive =
          href === "/"
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`text-lg font-normal tracking-wide leading-tight text-black transition-opacity hover:opacity-50 ${
              isActive ? "underline underline-offset-2" : ""
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
