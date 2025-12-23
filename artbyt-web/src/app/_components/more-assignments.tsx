import { Assignment } from "@/interfaces/assignment";
import { AssignmentPreview } from "./assignment-preview";

type Props = {
  assignments: Assignment[];
};

export function MoreAssignments({ assignments }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        Fler Projekt
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32 auto-rows-fr">
        {assignments.map((assignment) => (
          <AssignmentPreview
            key={assignment.slug}
            title={assignment.title || ""}
            coverImage={assignment.coverImage || ""}
            slug={assignment.slug}
            excerpt={assignment.excerpt || ""}
            objectPosition={assignment.coverImagePosition}
          />
        ))}
      </div>
    </section>
  );
}
