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
    <Link href={`/assignments/${slug}`} className="group block h-full">
      <article className="flex flex-col h-full transition-all duration-300 hover:-translate-y-1">
        <div className="mb-6 overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
          <CoverImage
            title={title}
            src={coverImage}
            objectPosition={objectPosition}
          />
        </div>
        <div className="mt-auto">
          <h3 className="text-3xl mb-3 leading-snug font-bold text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-lg leading-relaxed text-gray-600">{excerpt}</p>
        </div>
      </article>
    </Link>
  );
}
