import { getAllAssignments } from "@/lib/api";
import CoverImage from "@/app/_components/cover-image";

export default function Assignments() {
  const assignments = getAllAssignments();

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 content-center">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            Projekt
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {assignments.map((assignment) => (
            <article
              key={assignment.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="w-full">
                <CoverImage
                  title={assignment.title || ""}
                  src={
                    assignment.coverImage || assignment.images[0]?.url || null
                  }
                  slug={assignment.slug}
                  objectPosition={assignment.coverImagePosition}
                />
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={`/assignments/${assignment.slug}`}>
                    <span className="absolute inset-0" />
                    {assignment.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  {assignment.description || assignment.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
