import { MetadataRoute } from "next";
import { getAllAssignments, getAllProducts } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://artbyt.se";
  const assignments = getAllAssignments();
  const products = await getAllProducts();

  const assignmentUrls = assignments.map((assignment) => ({
    url: `${baseUrl}/assignments/${assignment.slug}`,
    lastModified: assignment.date ? new Date(assignment.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/assignments`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...assignmentUrls,
    ...productUrls,
  ];
}
