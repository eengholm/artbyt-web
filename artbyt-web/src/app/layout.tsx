import { Footer } from "@/app/_components/layout/footer";
import { getGeneralSettings } from "@/lib/api";
import { Inter } from "next/font/google";

import "./globals.css";
import { Menu } from "./_components/layout/menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: `ArtByT - Din lokala designstudio`,
  description: `För alla dina designbehov.`,
  openGraph: {
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getGeneralSettings();

  return (
    <html lang="sv" className={inter.className}>
      <body>
        <div className="inset-0 -z-10 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <Menu />
          <div className="min-h-screen">
            {children}
            <Footer
              contactEmail={settings.contactEmail}
              phoneNumber={settings.phoneNumber}
            />
          </div>
        </div>
      </body>
    </html>
  );
}
