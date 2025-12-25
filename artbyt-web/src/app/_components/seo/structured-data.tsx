export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tim Bylander",
    jobTitle: "Designer",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://artbyt.se",
    sameAs: [
      "https://www.instagram.com/artbyt_official",
      "https://www.linkedin.com/in/your_linkedin_username",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "SE",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function PortfolioStructuredData({
  assignments,
}: {
  assignments: any[];
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio - Tim Bylander",
    description: "Design portfolio showcasing creative work",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: assignments.map((assignment, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: assignment.title,
          description: assignment.excerpt,
          image: assignment.coverImage,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/assignments/${assignment.slug}`,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
