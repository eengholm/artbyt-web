import { ReactNode } from "react";
import { SiteFooter } from "@/app/_components/layout/site-footer";

export function PageShell({
  children,
  mainClassName = "",
  footerClassName = "",
}: {
  children: ReactNode;
  mainClassName?: string;
  footerClassName?: string;
}) {
  return (
    <div className="flex flex-col min-h-[calc(100svh-6rem)]">
      <main className={mainClassName}>{children}</main>
      <div className="flex-1" />
      <SiteFooter
        className={`-mx-4 md:-mx-8 px-4 md:px-8 ${footerClassName}`}
      />
    </div>
  );
}