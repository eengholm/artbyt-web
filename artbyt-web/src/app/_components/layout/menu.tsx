"use client";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navigation = [
  { name: "Hem", href: "/" },
  { name: "Projekt", href: "/assignments" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Om Mig", href: "/about" },
];

export function Menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 lg:px-8 py-5 flex items-center justify-between">
      <Link
        href="/"
        className="text-sm font-medium tracking-wide text-gray-900 hover:text-gray-600 transition-colors"
      >
        Portfolio
      </Link>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-8">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-sm tracking-wide transition-colors ${
                isActive
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {item.name}
              {isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gray-900" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden -m-2.5 p-2.5 text-gray-700"
        onClick={() => setMobileMenuOpen(true)}
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Mobile menu */}
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-black/10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#f0ede8] px-6 py-5 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-sm font-medium tracking-wide text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="mt-10 space-y-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block text-base tracking-wide transition-colors ${
                    isActive ? "text-gray-900 font-medium" : "text-gray-500"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
