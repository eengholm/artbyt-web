import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAssignmentBySlug, getAllAssignments } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { AssignmentHeader } from "@/app/_components/assignment-header";
import { AssignmentBody } from "@/app/_components/assignment-body";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const assignment = getAssignmentBySlug(slug);

  if (!assignment) {
    return {};
  }

  return {
    title: assignment.title,
    description: assignment.excerpt || assignment.content?.substring(0, 160),
    openGraph: {
      title: assignment.title,
      description: assignment.excerpt,
      images: assignment.coverImage ? [assignment.coverImage] : [],
      type: "article",
      publishedTime: assignment.date,
    },
  };
}

export default async function Assignment({ params }: Params) {
  const { slug } = await params;
  const assignment = getAssignmentBySlug(slug);

  if (!assignment) {
    notFound();
  }

  const content = await markdownToHtml(assignment.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <AssignmentHeader
            title={assignment.title}
            coverImage={assignment.coverImage}
          />
          <AssignmentBody content={content} />
        </article>
      </Container>
    </main>
  );
}

export async function generateStaticParams() {
  const assignments = getAllAssignments();

  return assignments.map((assignment) => ({
    slug: assignment.slug,
  }));
}
