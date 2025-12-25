import { getAllAssignments } from "@/lib/api";
import CoverImage from "@/app/_components/media/cover-image";
import Container from "@/app/_components/ui/container";

export default function Assignments() {
  const assignments = getAllAssignments();

  return (
    <Container>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Projekt
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Utforska mitt arbete och se hur jag hjälper företag att skapa starka
            visuella identiteter.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 border-t border-gray-200 pt-16 sm:mt-20 sm:pt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {assignments.map((assignment) => (
            <article
              key={assignment.slug}
              className="group flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full mb-6 overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
                <CoverImage
                  title={assignment.title || ""}
                  src={
                    assignment.coverImage || assignment.images?.[0]?.url || null
                  }
                  objectPosition={assignment.coverImagePosition}
                />
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors duration-300 mb-3">
                  <a href={`/assignments/${assignment.slug}`} className="block">
                    {assignment.title}
                  </a>
                </h3>
                <p className="text-base leading-relaxed text-gray-600 line-clamp-3 flex-grow">
                  {assignment.description || assignment.excerpt}
                </p>
                <a
                  href={`/assignments/${assignment.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors group/link"
                >
                  Läs mer
                  <span className="ml-1 transition-transform duration-300 group-hover/link:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Container>
  );
}
