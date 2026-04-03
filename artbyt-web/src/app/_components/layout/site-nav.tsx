"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/assignments", label: "Projekt" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Om Mig" },
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
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 top-24 z-50 flex flex-col gap-0 transition-all duration-300 md:opacity-100 md:translate-x-0 pl-8 pr-12 py-4 bg-gradient-to-r from-white via-white/70 to-transparent ${
        hidden ? "-translate-x-24 opacity-0" : "translate-x-0 opacity-100"
      }`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
        maskImage:
          "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
      }}
      aria-label="Site navigation"
    >
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
