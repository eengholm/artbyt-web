import Image from "next/image";
import Link from "next/link";
import { getAllAssignments } from "@/lib/api";

export default function Assignments() {
  const assignments = getAllAssignments();

  return (
    <div className="px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-px gap-y-0 bg-gray-200">
        {assignments.map((assignment, idx) => (
          <article
            key={assignment.slug}
            className={`bg-white${assignments.length % 2 !== 0 && idx === assignments.length - 1 ? " md:col-span-2" : ""}`}
          >
            {/* Inset top rule */}
            <div className="px-4 pt-3">
              <hr className="border-t border-gray-200" />
            </div>
            {/* Inset image */}
            <div className="px-4 pt-3">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={(() => {
                    const first = assignment.images?.[0];
                    const fallback =
                      typeof first === "string" ? first : first?.url;
                    return assignment.coverImage || fallback || "";
                  })()}
                  alt={assignment.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Metadata row */}
            <div className="flex gap-8 px-4 py-4">
              <div className="w-1/2 shrink-0">
                <span className="text-sm text-black">{assignment.title}</span>
              </div>
              <div className="flex-1 min-w-0 text-right">
                <p className="text-sm text-black leading-snug">
                  {assignment.description || assignment.excerpt}
                </p>
                <Link
                  href={`/assignments/${assignment.slug}`}
                  className="inline-block mt-3 text-sm text-black hover:opacity-50 transition-opacity"
                >
                  [View..]
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
