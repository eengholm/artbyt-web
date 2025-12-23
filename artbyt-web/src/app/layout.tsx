import Footer from "@/app/_components/layout/footer";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Menu } from "./_components/layout/menu";
import { getFooterSettings, getGeneralSettings } from "@/lib/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: `ArtByT - Din lokala designstudio`,
  description: `För alla dina designbehov.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footer = getFooterSettings();
  const settings = getGeneralSettings();
  const faviconUrl = settings.logo || "/favicon/favicon.ico";

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={faviconUrl} />
        <link rel="apple-touch-icon" sizes="180x180" href={faviconUrl} />
        <link rel="icon" type="image/png" sizes="32x32" href={faviconUrl} />
        <link rel="icon" type="image/png" sizes="16x16" href={faviconUrl} />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href={faviconUrl} color="#000000" />
        <link rel="shortcut icon" href={faviconUrl} />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className={inter.className}>
        <div className="inset-0 -z-10 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <Menu />
          <div className="min-h-screen">{children}</div>
          <Footer {...footer} />
        </div>
      </body>
    </html>
  );
}
