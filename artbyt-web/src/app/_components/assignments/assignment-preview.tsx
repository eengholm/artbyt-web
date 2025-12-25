import Link from "next/link";
import CoverImage from "../media/cover-image";

type Props = {
  title: string;
  coverImage: string;
  excerpt: string;
  slug: string;
  objectPosition?: string;
};

export function AssignmentPreview({
  title,
  coverImage,
  excerpt,
  slug,
  objectPosition,
}: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage}
          objectPosition={objectPosition}
        />
      </div>
      <div className="mt-auto">
        <h3 className="text-3xl mb-3 leading-snug">
          <Link href={`/assignments/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <div className="text-lg mb-4"></div>
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      </div>
    </div>
  );
}
