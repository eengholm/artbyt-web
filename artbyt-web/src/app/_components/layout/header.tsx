import Link from "next/link";
import Image from "next/image";
import { getGeneralSettings } from "@/lib/api";

const Header = () => {
  const settings = getGeneralSettings();
  const { logo, siteName } = settings;

  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/" className="hover:underline flex items-center gap-3">
        {logo && (
          <Image
            src={logo}
            alt={siteName || "Site Logo"}
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
        )}
        <span>{siteName || "ArtByT"}</span>
      </Link>
      .
    </h2>
  );
};

export default Header;
