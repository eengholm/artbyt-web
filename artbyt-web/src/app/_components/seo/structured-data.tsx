export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tim Bylander",
    jobTitle: "Designer",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://artbyt.se",
    sameAs: ["https://www.instagram.com/artbyt_official"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "SE",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(
          /<\/script>/gi,
          "<\\/script>",
        ),
      }}
    />
  );
}
