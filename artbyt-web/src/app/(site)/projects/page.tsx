import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getAllProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Projekt",
  description:
    "Utvalda projekt inom grafisk design, varumärkesidentitet och illustration av Tim Bylander.",
  openGraph: {
    title: "Projekt - Tim Bylander",
    description:
      "Utvalda projekt inom grafisk design, varumärkesidentitet och illustration.",
    type: "website",
  },
};

export default function Projects() {
  const assignments = getAllProjects();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
        {assignments.map((assignment, idx) => (
          <article
            key={assignment.slug}
            className={`bg-white flex flex-col${assignments.length % 2 !== 0 && idx === assignments.length - 1 ? " md:col-span-2" : ""}`}
          >
            {/* Inset image */}
            <div className="px-4 pt-4">
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <Image
                  src={(() => {
                    const first = assignment.images?.[0];
                    const fallback =
                      typeof first === "string" ? first : first?.url;
                    return assignment.coverImage || fallback || "";
                  })()}
                  alt={assignment.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`${assignment.coverImageFit === "contain" ? "object-contain" : "object-cover"} object-center`}
                />
              </div>
            </div>

            {/* Metadata row */}
            <div className="flex gap-8 px-4 py-4 flex-1">
              <div className="w-1/2 shrink-0">
                <span className="text-sm text-black">{assignment.title}</span>
              </div>
              <div className="flex-1 min-w-0 text-right flex flex-col">
                <p className="text-sm text-black leading-snug">
                  {assignment.description || assignment.excerpt}
                </p>
                <Link
                  href={`/projects/${assignment.slug}`}
                  className="mt-auto pt-3 text-sm text-black hover:opacity-50 transition-opacity"
                >
                  [Visa]
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
