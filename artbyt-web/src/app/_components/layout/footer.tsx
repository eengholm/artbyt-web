interface FooterProps {
  contactEmail?: string;
  phoneNumber?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  behanceUrl?: string;
}

export function Footer({
  instagramUrl = "https://www.instagram.com/artbyt_official",
  linkedinUrl = "https://www.linkedin.com/in/your_linkedin_username",
  behanceUrl,
}: FooterProps = {}) {
  const year = new Date().getFullYear();

  const socialLinks = [
    { name: "Instagram", href: instagramUrl },
    { name: "LinkedIn", href: linkedinUrl },
    ...(behanceUrl ? [{ name: "Behance", href: behanceUrl }] : []),
  ];

  return (
    <footer className="border-t border-gray-300 px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="text-xs uppercase tracking-widest text-gray-400">
        © {year} Artbyt Portfolio
      </p>
      <nav className="flex items-center gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
        ))}
      </nav>
    </footer>
  );
}

export default Footer;
