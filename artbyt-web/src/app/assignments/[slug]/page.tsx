import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAssignmentBySlug, getAllAssignments } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/ui/container";
import { AssignmentBody } from "@/app/_components/assignments/assignment-body";
import { AssignmentHeader } from "@/app/_components/assignments/assignment-header";
import { ImageGallery } from "@/app/_components/media/image-gallery";
import { AssignmentTestimonial } from "@/app/_components/assignments/assignment-testimonial";
import Header from "@/app/_components/layout/header";

// Revalidate every day
export const revalidate = 86400;

export default async function Assignment({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
            objectPosition={assignment.coverImagePosition}
          />
          <AssignmentBody content={content} />
          {assignment.images && assignment.images.length > 0 && (
            <ImageGallery images={assignment.images} title={assignment.title} />
          )}
          {assignment.testimonial && (
            <AssignmentTestimonial testimonial={assignment.testimonial} />
          )}
        </article>
      </Container>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const assignment = getAssignmentBySlug(slug);

  if (!assignment) {
    return {
      title: "Projekt hittades inte",
    };
  }

  const title = `${assignment.title} | Artbyt`;

  return {
    title,
    description: assignment.excerpt,
    openGraph: {
      title,
      description: assignment.excerpt,
      images: [assignment.ogImage.url],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: assignment.excerpt,
      images: [assignment.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const assignments = getAllAssignments();

  return assignments.map((assignment) => ({
    slug: assignment.slug,
  }));
}
