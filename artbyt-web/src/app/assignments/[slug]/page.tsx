import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllAssignments, getAssignmentById } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { IdentificationIcon } from "@heroicons/react/24/outline";

export default async function Assignment({ params }: Params) {
  const resolvedParams = await params;
  console.log("Params: ", resolvedParams);
  const id = parseInt(resolvedParams.slug);
  console.log("Id: ", id);
  const assignment = getAssignmentById(id);

  if (!assignment) {
    return notFound();
  }

  return (
    <div className="py-24 sm:py-32">
      <Container>
        <article className="mb-32">
          <PostHeader
            title={assignment.title!}
            coverImage={assignment.images[0].url!}
          />
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
      images: [assignment.images[0].url!],
    },
  };
}

export async function generateStaticParams() {
  const assignments = getAllAssignments();

  return assignments.map((assignment) => ({
    slug: assignment.id.toString(),
  }));
}
