import { MetadataRoute } from "next";
import { getAllAssignments } from "@/lib/api";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://artbyt.se";
  const assignments = getAllAssignments();

  const assignmentUrls = assignments.map((assignment) => ({
    url: `${baseUrl}/assignments/${assignment.slug}`,
    lastModified: assignment.date ? new Date(assignment.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
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
    ...assignmentUrls,
  ];
}
