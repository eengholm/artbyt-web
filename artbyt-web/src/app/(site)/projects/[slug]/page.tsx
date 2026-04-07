import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getAllProjects } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "@/app/_components/shared/markdown-styles.module.css";

// Revalidate every day
export const revalidate = 86400;

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const assignment = getProjectBySlug(slug);

  if (!assignment) {
    notFound();
  }

  const content = await markdownToHtml(assignment.content || "");

  return (
    <main>
      {/* Top rule */}
      <hr className="border-t border-gray-200 mb-3" />

      {/* Cover image */}
      {assignment.coverImage && (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={assignment.coverImage}
            alt={assignment.title}
            fill
            sizes="100vw"
            className={`${assignment.coverImageFit === "contain" ? "object-contain" : "object-cover"} object-center`}
            priority
          />
        </div>
      )}

      {/* Metadata row */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-8 py-4">
        <div className="md:w-1/2 md:shrink-0">
          <span className="text-sm text-black">{assignment.title}</span>
        </div>
        <div className="flex-1 min-w-0 md:text-right">
          <p className="text-sm text-black leading-snug">
            {assignment.description || assignment.excerpt}
          </p>
          <Link
            href="/projects"
            className="inline-block mt-3 text-sm text-black hover:opacity-50 transition-opacity"
          >
            [← Alla projekt]
          </Link>
        </div>
      </div>

      {/* Body */}
      <hr className="border-t border-gray-200 mb-6" />
      <div
        className={`${markdownStyles["markdown"]} md:columns-2 md:gap-12`}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Image gallery */}
      {assignment.images && assignment.images.length > 0 && (
        <div className="mt-12 columns-2 gap-3">
          {assignment.images.map((img, i) => {
            const src = typeof img === "string" ? img : img.url;
            if (!src) return null;
            return (
              <div key={i} className="mb-3 break-inside-avoid">
                <Image
                  src={src}
                  alt={`${assignment.title} — ${i + 1}`}
                  width={0}
                  height={0}
                  sizes="50vw"
                  className="w-full h-auto"
                />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const assignment = getProjectBySlug(slug);

  if (!assignment) {
    return {
      title: "Projekt hittades inte",
    };
  }

  const title = `${assignment.title} | Tim Bylander`;

  return {
    title,
    description: assignment.excerpt,
    openGraph: {
      title,
      description: assignment.excerpt,
      images: assignment.ogImage.url ? [assignment.ogImage.url] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: assignment.excerpt,
      images: assignment.ogImage.url ? [assignment.ogImage.url] : [],
    },
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}
