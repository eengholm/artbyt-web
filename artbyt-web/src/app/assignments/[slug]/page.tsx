import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllAssignments, getAssignmentById } from "@/lib/api";
import Container from "@/app/_components/container";
import { AssignmentHeader } from "@/app/_components/assignment-header";
import { AssignmentBody } from "@/app/_components/assignment-body";

export default async function Assignment({ params }: Params) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.slug);
  const assignment = getAssignmentById(id);

  if (!assignment) {
    return notFound();
  }

  return (
    <div className="py-24 sm:py-32">
      <Container>
        <article className="mb-32">
          <AssignmentHeader
            title={assignment.title!}
            coverImage={
              assignment.coverImage || assignment.images[0]?.url || ""
            }
          />
          <AssignmentBody content={assignment.content || ""} />
        </article>
      </Container>
    </div>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.slug);
  const assignment = getAssignmentById(id);

  if (!assignment) {
    return notFound();
  }

  const title = `${assignment.title} | ArtByT`;

  return {
    title,
    openGraph: {
      title,
      images: [assignment.images[0]?.url || assignment.coverImage || ""],
    },
  };
}

export async function generateStaticParams() {
  const assignments = getAllAssignments();

  return assignments.map((assignment) => ({
    slug: assignment.id.toString(),
  }));
}
