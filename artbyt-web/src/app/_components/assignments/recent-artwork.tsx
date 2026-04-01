import Image from "next/image";
import Link from "next/link";
import { Assignment } from "@/interfaces/assignment";

type Props = {
  assignments: Assignment[];
  totalCount?: number;
};

type CardProps = {
  assignment: Assignment;
  imageClass: string;
};

function ArtworkCard({ assignment, imageClass }: CardProps) {
  return (
    <Link href={`/assignments/${encodeURIComponent(assignment.slug)}`} className="group block">
      <div className={`relative overflow-hidden ${imageClass}`}>
        {assignment.coverImage ? (
          <Image
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            src={assignment.coverImage}
            alt={assignment.title}
            style={{ objectPosition: assignment.coverImagePosition || "center" }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="text-base font-bold text-gray-900 group-hover:text-gray-600 transition-colors duration-200 leading-snug">
          {assignment.title}
        </h3>
        {assignment.category && (
          <span className="shrink-0 text-xs uppercase tracking-widest text-gray-400 pt-0.5">
            {assignment.category}
          </span>
        )}
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
        {assignment.excerpt}
      </p>
    </Link>
  );
}

export function RecentArtwork({ assignments, totalCount }: Props) {
  if (!assignments || assignments.length === 0) return null;

  const leftItems = assignments.filter((_, i) => i % 2 === 0);
  const rightItems = assignments.filter((_, i) => i % 2 !== 0);

  return (
    <section className="mb-24 md:mb-32">
      {/* Section header */}
      <div className="flex items-baseline justify-between mb-12 border-t border-gray-300 pt-8">
        <h2 className="text-xl font-bold text-gray-900">Recent Artwork</h2>
        <span className="text-xs uppercase tracking-widest text-gray-400">
          Selected Works ({totalCount ?? assignments.length})
        </span>
      </div>

      {/* Staggered 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
        {/* Left column */}
        <div className="flex flex-col gap-12">
          {leftItems.map((assignment) => (
            <ArtworkCard
              key={assignment.slug}
              assignment={assignment}
              imageClass="aspect-[5/4]"
            />
          ))}
        </div>

        {/* Right column – offset downward for the staggered effect */}
        <div className="flex flex-col gap-12 md:mt-24">
          {rightItems.map((assignment) => (
            <ArtworkCard
              key={assignment.slug}
              assignment={assignment}
              imageClass="aspect-[3/4]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
